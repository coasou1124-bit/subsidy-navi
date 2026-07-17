# 暮らしAIアシスタント — データベース設計書

## 概要

サンプル静的データ（TypeScript配列）から、本番運用に耐えるデータベース管理へ移行するための設計。
将来の自動更新（スクレイピング・API連携）を見据えた拡張可能な構造とする。

---

## 推奨技術スタック

| 用途 | 採用技術 | 理由 |
|---|---|---|
| ORM | **Prisma** | Next.js 15との親和性、TypeScript型自動生成、マイグレーション管理 |
| DB (開発) | **SQLite** | ローカル開発にファイル1つで完結 |
| DB (本番) | **PostgreSQL (Supabase)** | 無料枠あり、配列型・JSONB・全文検索対応 |
| 認証 (将来) | Supabase Auth | 管理者ログイン・ユーザー保存履歴に備える |

```
Next.js 15 App Router
      │
   Prisma ORM  ←→  PostgreSQL (Supabase)
      │
   lib/db.ts (シングルトンクライアント)
```

---

## ER図（エンティティ関係）

```
prefectures ──── municipalities
     │                 │
     └────────┬─────────┘
              │
           subsidies ──── subsidy_conditions (1:1)
              │
              ├──── ai_summaries (1:N, バージョン管理)
              ├──── subsidy_tags (1:N)
              └──── admin_logs (1:N)
                        
scraper_configs (独立テーブル, 将来用)
```

---

## テーブル定義

### 1. `prefectures` — 都道府県マスタ

```sql
CREATE TABLE prefectures (
  id    INTEGER PRIMARY KEY,   -- JIS都道府県コード (1〜47)
  code  TEXT    NOT NULL UNIQUE, -- 'JP-13' (ISO 3166-2形式)
  name  TEXT    NOT NULL        -- '東京都', '大阪府'
);
```

| カラム | 型 | 説明 |
|---|---|---|
| `id` | INTEGER PK | JIS都道府県コード 1〜47 |
| `code` | TEXT UNIQUE | ISO 3166-2形式 `JP-13` |
| `name` | TEXT | 都道府県名 |

**初期データ**: 47都道府県を固定データとして投入。変更頻度ゼロ。

---

### 2. `municipalities` — 市区町村マスタ

```sql
CREATE TABLE municipalities (
  id            INTEGER PRIMARY KEY,
  prefecture_id INTEGER NOT NULL REFERENCES prefectures(id),
  jis_code      TEXT    NOT NULL UNIQUE, -- '131016' (6桁JISコード)
  name          TEXT    NOT NULL,         -- '千代田区'
  kana          TEXT                      -- 'チヨダク' (検索補助)
);
```

| カラム | 型 | 説明 |
|---|---|---|
| `jis_code` | TEXT UNIQUE | 総務省JIS X 0401/0402 (6桁) |
| `kana` | TEXT | よみがな（将来のインクリメンタルサーチ用） |

**データ取得元**: 総務省「全国地方公共団体コード」
`https://www.soumu.go.jp/denshijiti/code.html`

---

### 3. `subsidies` — 制度マスタ ★中心テーブル

```sql
CREATE TABLE subsidies (
  -- 識別
  id                TEXT        PRIMARY KEY, -- 'national-001' or UUID
  slug              TEXT        NOT NULL UNIQUE, -- URL用 'jidou-teate'

  -- 基本情報
  name              TEXT        NOT NULL,
  provider_level    TEXT        NOT NULL CHECK (provider_level IN ('national','prefectural','municipal')),
  provider_name     TEXT        NOT NULL, -- '内閣府', '東京都', '千代田区'
  prefecture_id     INTEGER     REFERENCES prefectures(id),    -- NULLなら全国
  municipality_id   INTEGER     REFERENCES municipalities(id), -- NULLなら全国or都道府県

  category          TEXT        NOT NULL CHECK (category IN (
                      'childcare','housing','employment','medical',
                      'elderly','disability','income','education','other'
                    )),
  short_description TEXT        NOT NULL,
  official_url      TEXT        NOT NULL,

  -- 制度の有効期間
  start_date        DATE,                  -- 制度開始日 (NULLなら不明)
  end_date          DATE,                  -- 制度終了日 (NULLなら無期限)

  -- 申請受付期間（制度期間とは別）
  application_start DATE,                  -- 今年度の申請受付開始
  application_end   DATE,                  -- 今年度の申請締切

  -- データ管理
  is_active         BOOLEAN     NOT NULL DEFAULT true,
  data_source       TEXT        NOT NULL DEFAULT 'manual'
                      CHECK (data_source IN ('manual','scraping','api')),
  source_url        TEXT,                  -- スクレイピング/API取得元URL

  -- タイムスタンプ
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_verified_at  TIMESTAMPTZ            -- 担当者が最後に内容を確認した日時
);
```

**重要カラム解説**:

| カラム | 役割 |
|---|---|
| `provider_level` | 国・都道府県・市区町村の3階層 |
| `prefecture_id` / `municipality_id` | NULLなら上位レベルが適用 |
| `start_date` / `end_date` | 制度そのものの有効期間（法改正等で変わる） |
| `application_start` / `application_end` | 今年度の申請窓口が開いている期間 |
| `data_source` | `'manual'`=手動入力 / `'scraping'`=自動収集 / `'api'`=行政API |
| `source_url` | 自動更新時の取得元（どのページから取ってきたか） |
| `last_verified_at` | 公式サイトと突き合わせて内容が正確と確認した日時 |

---

### 4. `subsidy_conditions` — 対象条件（構造化）

subsidiesと1:1。条件を構造化して保存することで、コードでのフィルタリングを可能にする。

```sql
CREATE TABLE subsidy_conditions (
  subsidy_id          TEXT    PRIMARY KEY REFERENCES subsidies(id) ON DELETE CASCADE,

  -- 年齢条件
  age_min             INTEGER,             -- 最低年齢 (NULL=制限なし)
  age_max             INTEGER,             -- 最高年齢 (NULL=制限なし)

  -- 家族構成条件 (複数選択可)
  family_structures   TEXT[]  DEFAULT '{}',  -- ['single','single_parent']

  -- 就労状況条件 (複数選択可)
  employment_types    TEXT[]  DEFAULT '{}',  -- ['employed','unemployed']

  -- 子ども関連
  has_children        BOOLEAN,             -- NULL=条件なし
  children_count_min  INTEGER,             -- 子ども最低人数

  -- 収入条件
  income_max_10k      INTEGER,             -- 上限所得（万円、NULL=制限なし）

  -- 特定属性
  requires_disability BOOLEAN DEFAULT false,
  requires_student    BOOLEAN DEFAULT false,
  is_single_parent    BOOLEAN DEFAULT false,

  -- 地域絞り込み（都道府県・市区町村レベルの条件が複数ある場合）
  -- 例: '東京都か大阪府の住民のみ' などの複合条件
  prefecture_ids      INTEGER[] DEFAULT '{}',
  municipality_ids    INTEGER[] DEFAULT '{}'
);
```

**設計の考え方**:
- 条件を別テーブルに分離することで `WHERE` でのフィルタリングをSQLレベルで実行可能
- `TEXT[]` (PostgreSQL配列型) で複数選択を格納
- 将来的に条件が増えてもカラム追加で対応（ENUMより柔軟）

---

### 5. `ai_summaries` — AIサマリ（バージョン管理）

制度の内容はAIが要約するが、AIモデルが変わったり、制度内容が変わったりした場合に履歴を残す。

```sql
CREATE TABLE ai_summaries (
  id                  SERIAL      PRIMARY KEY,
  subsidy_id          TEXT        NOT NULL REFERENCES subsidies(id) ON DELETE CASCADE,
  is_current          BOOLEAN     NOT NULL DEFAULT true, -- 現在表示中のバージョン

  -- 表示用テキスト（AIが生成）
  amount_label        TEXT        NOT NULL, -- '月額1万〜3万円'
  target_people       TEXT        NOT NULL, -- '中学校修了前の子を養育する方'
  deadline_label      TEXT        NOT NULL, -- '随時申請可'
  deadline_date       DATE,                 -- 締切日（日付比較用、ラベルとは別）
  application_place   TEXT        NOT NULL, -- '住んでいる市区町村の窓口'
  difficulty          INTEGER     NOT NULL CHECK (difficulty BETWEEN 1 AND 5),
  estimated_time      TEXT        NOT NULL, -- '30〜60分'

  -- リスト型（PostgreSQL配列）
  required_documents  TEXT[]      NOT NULL DEFAULT '{}',
  notes               TEXT[]      NOT NULL DEFAULT '{}',

  -- メタ情報
  generated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ai_model            TEXT,       -- 'claude-sonnet-4-6', 'gpt-4o' など
  source_version      TEXT        -- 元データのバージョン（変更追跡用）
);
```

**バージョン管理の運用**:
1. 新しいサマリを生成 → `is_current = true` で INSERT
2. 古いサマリを `is_current = false` に UPDATE
3. 差分ログが残るため、品質劣化の検出が可能

---

### 6. `subsidy_tags` — タグ

```sql
CREATE TABLE subsidy_tags (
  subsidy_id  TEXT NOT NULL REFERENCES subsidies(id) ON DELETE CASCADE,
  tag         TEXT NOT NULL,
  PRIMARY KEY (subsidy_id, tag)
);
```

タグ一覧: `'子育て'`, `'現金給付'`, `'育休'`, `'医療費'`, `'一人親'` など自由設定。

---

### 7. `admin_logs` — 操作・更新ログ

```sql
CREATE TABLE admin_logs (
  id             SERIAL      PRIMARY KEY,
  subsidy_id     TEXT        REFERENCES subsidies(id),
  action         TEXT        NOT NULL CHECK (action IN (
                   'created','updated','verified',
                   'deactivated','ai_summary_updated',
                   'scrape_success','scrape_failed'
                 )),
  changed_fields JSONB,      -- {'name': ['旧値', '新値']} 形式
  operator       TEXT        NOT NULL, -- 'manual:admin', 'scraper:mhlw', 'api:cfa'
  notes          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**使い方例**:
```json
{
  "subsidy_id": "national-001",
  "action": "updated",
  "changed_fields": {
    "official_url": [
      "https://old-url.go.jp",
      "https://www.cfa.go.jp/policies/kokoseido/jidouteate/"
    ]
  },
  "operator": "scraper:cfa",
  "notes": "URLが変更されていたため自動更新"
}
```

---

### 8. `scraper_configs` — スクレイピング設定（将来用）

```sql
CREATE TABLE scraper_configs (
  id            SERIAL      PRIMARY KEY,
  provider_name TEXT        NOT NULL, -- '厚生労働省', 'こども家庭庁'
  base_url      TEXT        NOT NULL,
  schedule      TEXT,                  -- cron式 '0 2 * * 0' (毎週日曜2時)
  is_active     BOOLEAN     NOT NULL DEFAULT false,
  last_run_at   TIMESTAMPTZ,
  last_status   TEXT        CHECK (last_status IN ('success','error','running')),
  error_message TEXT,
  config_json   JSONB                  -- スクレイパー固有パラメータ
);
```

---

## インデックス設計

```sql
-- 検索頻度が高いカラムにインデックス
CREATE INDEX idx_subsidies_category       ON subsidies(category);
CREATE INDEX idx_subsidies_provider_level ON subsidies(provider_level);
CREATE INDEX idx_subsidies_prefecture_id  ON subsidies(prefecture_id);
CREATE INDEX idx_subsidies_is_active      ON subsidies(is_active);
CREATE INDEX idx_subsidies_end_date       ON subsidies(end_date); -- 期限切れ検索

CREATE INDEX idx_conditions_age           ON subsidy_conditions(age_min, age_max);
CREATE INDEX idx_conditions_has_children  ON subsidy_conditions(has_children);

CREATE INDEX idx_summaries_subsidy_current ON ai_summaries(subsidy_id, is_current);

CREATE INDEX idx_logs_subsidy_id          ON admin_logs(subsidy_id);
CREATE INDEX idx_logs_created_at          ON admin_logs(created_at DESC);

-- 全文検索（PostgreSQL専用）
CREATE INDEX idx_subsidies_name_fts ON subsidies USING gin(to_tsvector('simple', name));
```

---

## Prismaスキーマ（実装用）

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Prefecture {
  id             Int              @id
  code           String           @unique
  name           String
  municipalities Municipality[]
  subsidies      Subsidy[]
}

model Municipality {
  id           Int        @id @default(autoincrement())
  prefectureId Int
  jisCode      String     @unique
  name         String
  kana         String?
  prefecture   Prefecture @relation(fields: [prefectureId], references: [id])
  subsidies    Subsidy[]
}

model Subsidy {
  id             String   @id
  slug           String   @unique
  name           String
  providerLevel  String
  providerName   String
  prefectureId   Int?
  municipalityId Int?
  category       String
  shortDescription String
  officialUrl    String
  startDate      DateTime?
  endDate        DateTime?
  applicationStart DateTime?
  applicationEnd   DateTime?
  isActive       Boolean  @default(true)
  dataSource     String   @default("manual")
  sourceUrl      String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  lastVerifiedAt DateTime?

  prefecture    Prefecture?    @relation(fields: [prefectureId], references: [id])
  municipality  Municipality?  @relation(fields: [municipalityId], references: [id])
  conditions    SubsidyCondition?
  aiSummaries   AiSummary[]
  tags          SubsidyTag[]
  logs          AdminLog[]
}

model SubsidyCondition {
  subsidyId          String    @id
  ageMin             Int?
  ageMax             Int?
  familyStructures   String[]
  employmentTypes    String[]
  hasChildren        Boolean?
  childrenCountMin   Int?
  incomeMax10k       Int?
  requiresDisability Boolean   @default(false)
  requiresStudent    Boolean   @default(false)
  isSingleParent     Boolean   @default(false)
  prefectureIds      Int[]
  municipalityIds    Int[]

  subsidy Subsidy @relation(fields: [subsidyId], references: [id], onDelete: Cascade)
}

model AiSummary {
  id                 Int       @id @default(autoincrement())
  subsidyId          String
  isCurrent          Boolean   @default(true)
  amountLabel        String
  targetPeople       String
  deadlineLabel      String
  deadlineDate       DateTime?
  applicationPlace   String
  difficulty         Int
  estimatedTime      String
  requiredDocuments  String[]
  notes              String[]
  generatedAt        DateTime  @default(now())
  aiModel            String?
  sourceVersion      String?

  subsidy Subsidy @relation(fields: [subsidyId], references: [id], onDelete: Cascade)
}

model SubsidyTag {
  subsidyId String
  tag       String
  subsidy   Subsidy @relation(fields: [subsidyId], references: [id], onDelete: Cascade)

  @@id([subsidyId, tag])
}

model AdminLog {
  id            Int      @id @default(autoincrement())
  subsidyId     String?
  action        String
  changedFields Json?
  operator      String
  notes         String?
  createdAt     DateTime @default(now())

  subsidy Subsidy? @relation(fields: [subsidyId], references: [id])
}

model ScraperConfig {
  id           Int       @id @default(autoincrement())
  providerName String
  baseUrl      String
  schedule     String?
  isActive     Boolean   @default(false)
  lastRunAt    DateTime?
  lastStatus   String?
  errorMessage String?
  configJson   Json?
}
```

---

## データアクセス層の設計

```
app/
  api/
    subsidies/
      route.ts          ← GET /api/subsidies (一覧取得・フィルタリング)
      [id]/
        route.ts        ← GET /api/subsidies/[id] (詳細)
    admin/
      subsidies/
        route.ts        ← POST/PUT (管理者用CRUD)
      scraper/
        route.ts        ← POST (スクレイピング実行トリガー)

lib/
  db.ts                 ← Prismaクライアントのシングルトン
  repositories/
    subsidyRepository.ts   ← DB操作をカプセル化
    summaryRepository.ts
```

`subsidyRepository.ts` の設計例:

```typescript
// lib/repositories/subsidyRepository.ts

export async function findSubsidies(filters: {
  category?: string
  prefectureId?: number
  municipalityId?: number
  isActive?: boolean
  endDateAfter?: Date
}) {
  return prisma.subsidy.findMany({
    where: {
      isActive: filters.isActive ?? true,
      ...(filters.category && { category: filters.category }),
      ...(filters.prefectureId && {
        OR: [
          { prefectureId: filters.prefectureId },
          { prefectureId: null }, // 全国対象も含む
        ],
      }),
      OR: [
        { endDate: null },         // 無期限
        { endDate: { gt: new Date() } }, // まだ有効
      ],
    },
    include: {
      conditions: true,
      aiSummaries: { where: { isCurrent: true }, take: 1 },
      tags: true,
    },
  })
}
```

---

## 静的データからの移行手順

### Step 1: 環境構築
```bash
npm install prisma @prisma/client
npx prisma init
# .env に DATABASE_URL を設定
```

### Step 2: スキーマ適用
```bash
npx prisma migrate dev --name init
```

### Step 3: シードスクリプト
現在の `data/subsidies/national.ts` をシード用スクリプトに変換:

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { nationalSubsidies } from '../data/subsidies/national'

const prisma = new PrismaClient()

async function main() {
  for (const s of nationalSubsidies) {
    await prisma.subsidy.upsert({
      where: { id: s.id },
      update: {},
      create: {
        id: s.id,
        slug: s.id, // 暫定
        name: s.name,
        providerLevel: s.providerLevel,
        providerName: s.providerName,
        category: s.category,
        shortDescription: s.shortDescription,
        officialUrl: s.officialUrl,
        dataSource: 'manual',
        conditions: { create: s.conditions },
        aiSummaries: {
          create: {
            amountLabel: s.aiSummary.amount,
            targetPeople: s.aiSummary.targetPeople,
            deadlineLabel: s.aiSummary.deadline,
            applicationPlace: s.aiSummary.applicationPlace,
            difficulty: s.aiSummary.difficulty,
            estimatedTime: s.aiSummary.estimatedApplicationTime,
            requiredDocuments: s.aiSummary.requiredDocuments,
            notes: s.aiSummary.notes,
            aiModel: 'manual',
          },
        },
        tags: {
          create: s.tags.map((tag) => ({ tag })),
        },
      },
    })
  }
}

main()
```

---

## 将来の自動更新設計

### フロー図

```
[定期実行 (cron/GitHub Actions)]
        │
        ▼
[スクレイパー / 行政API]
  ・こども家庭庁 RSS
  ・e-Gov法令API
  ・各省庁サイト
        │
        ▼
[差分検出ロジック]
  変更なし → スキップ (last_verified_at を更新)
  変更あり → 旧データを保存 + 新データをステージング
        │
        ▼
[AIサマリ再生成]
  (変更が内容に影響する場合のみ)
        │
        ▼
[admin_logs に記録]
  + Slack通知 / メール通知 (将来)
```

### 更新優先度

| 更新種別 | 頻度 | 方法 |
|---|---|---|
| 国の制度（e-Gov） | 月1回 | e-Gov API（将来、現在は手動） |
| 都道府県の制度 | 月2回 | スクレイピング |
| 市区町村の制度 | 週1回 | スクレイピング（更新が多い） |
| 申請期限チェック | 毎日 | `end_date` > 今日 のチェック |

---

## 実装フェーズ

| フェーズ | 内容 | 優先度 |
|---|---|---|
| **Phase 1** (今すぐ) | Prisma + SQLite 導入、既存30件をシード移行 | 高 |
| **Phase 2** | Next.js API Routes → DB参照に切り替え | 高 |
| **Phase 3** | Supabase (PostgreSQL) に切り替え | 中 |
| **Phase 4** | 都道府県・市区町村データ投入 | 中 |
| **Phase 5** | スクレイパー実装・定期実行 | 低 |
| **Phase 6** | 管理者画面（制度のCRUD） | 低 |

---

## 設計の制約・注意点

1. **個人情報はDBに保存しない** — ユーザープロフィールはセッションのみ（チャットフロー上の一時データ）
2. **行政情報の著作権** — 公式サイトのテキストをそのままDB保存するのではなく、AIで要約した「参考情報」として保存
3. **更新タイムラグ** — `last_verified_at` を表示し、古い情報であることをユーザーに伝える
4. **廃止された制度** — `is_active = false` で論理削除（物理削除しない）

---

*作成日: 2026-06-28*
*次のステップ: Phase 1 実装 — `npm install prisma` から始める*
