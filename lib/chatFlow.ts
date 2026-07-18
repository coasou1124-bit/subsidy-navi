import { filterSubsidies, getMissedSubsidies } from './filterSubsidies'
import { getAllSubsidies } from '@/data/index'
import { PREFECTURES } from './constants'
import type {
  Subsidy,
  UserProfile,
  FamilyStructure,
  EmploymentType,
  SubsidyCategory,
  SearchResult,
} from '@/types/subsidy'

export type ChatStep =
  | 'greeting'
  | 'ask_age'
  | 'ask_family'
  | 'ask_employment'
  | 'ask_prefecture'
  | 'ask_prefecture_other'
  | 'show_results'
  | 'done'

export interface NextConsultation {
  emoji: string
  label: string
  description: string
  quickReply: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  quickReplies?: string[]
  results?: SearchResult[]
  missedSubsidies?: { subsidy: Subsidy; reason: string }[]
  nextConsultations?: NextConsultation[]
}

export interface ChatProfile {
  concerns: SubsidyCategory[]
  age?: number
  familyStructure?: FamilyStructure
  hasChildren?: boolean
  employment?: EmploymentType
  prefecture?: string
}

export interface ChatState {
  step: ChatStep
  profile: ChatProfile
  messages: ChatMessage[]
}

const STARTER_REPLIES = [
  '子どもが生まれます',
  '仕事を辞めます',
  '家を買いたいです',
  '介護が必要です',
  'お金に困っています',
  '資格を取りたいです',
]

const CONCERN_MAP: Record<string, SubsidyCategory[]> = {
  '子どもが生まれます': ['childcare'],
  '仕事を辞めます': ['employment', 'income', 'housing'],
  '家を買いたいです': ['housing'],
  '介護が必要です': ['elderly'],
  'お金に困っています': ['income', 'medical', 'housing'],
  '資格を取りたいです': ['education', 'employment'],
}

const CONSULTATION_MAP: Record<SubsidyCategory, NextConsultation> = {
  childcare: {
    emoji: '👶',
    label: '子育て支援',
    description: '育児給付・保育費の助成制度',
    quickReply: '子どもが生まれます',
  },
  housing: {
    emoji: '🏠',
    label: '住宅・家賃支援',
    description: 'マイホーム取得や家賃助成の制度',
    quickReply: '家を買いたいです',
  },
  employment: {
    emoji: '💼',
    label: '就職・転職支援',
    description: '職業訓練や雇用促進の給付制度',
    quickReply: '仕事を辞めます',
  },
  medical: {
    emoji: '🏥',
    label: '医療費の軽減',
    description: '高額療養費や医療助成の制度',
    quickReply: 'お金に困っています',
  },
  elderly: {
    emoji: '👴',
    label: '介護・老後の備え',
    description: '介護保険や老後の生活支援',
    quickReply: '介護が必要です',
  },
  disability: {
    emoji: '♿',
    label: '障がい者支援',
    description: '障がい給付や生活支援制度',
    quickReply: 'お金に困っています',
  },
  income: {
    emoji: '💴',
    label: '生活費の支援',
    description: '生活困窮時の給付・貸付制度',
    quickReply: 'お金に困っています',
  },
  education: {
    emoji: '📚',
    label: '教育費の支援',
    description: '学費軽減・奨学金の支援制度',
    quickReply: '資格を取りたいです',
  },
  other: {
    emoji: '💡',
    label: 'その他の支援',
    description: '様々な生活支援制度',
    quickReply: 'お金に困っています',
  },
}

function normalizePrefecture(input: string): string {
  const trimmed = input.trim()
  if ((PREFECTURES as readonly string[]).includes(trimmed)) return trimmed
  const bare = trimmed.replace(/[県府都道]$/, '')
  for (const suffix of ['県', '府', '都', '道']) {
    const candidate = bare + suffix
    if ((PREFECTURES as readonly string[]).includes(candidate)) return candidate
  }
  return trimmed
}

function detectConcerns(input: string): SubsidyCategory[] {
  const exact = CONCERN_MAP[input]
  if (exact) return exact

  const concerns: SubsidyCategory[] = []
  if (/子|育|産|妊/.test(input)) concerns.push('childcare')
  if (/仕事|就職|失業|辞め|転職/.test(input)) concerns.push('employment')
  if (/家|住|引越|賃貸|住宅/.test(input)) concerns.push('housing')
  if (/病気|医療|通院/.test(input)) concerns.push('medical')
  if (/介護|高齢/.test(input)) concerns.push('elderly')
  if (/お金|生活|収入|困/.test(input)) concerns.push('income')
  if (/勉強|資格|学校|教育/.test(input)) concerns.push('education')

  return concerns.length > 0 ? concerns : ['other' as SubsidyCategory]
}

function getNextConsultations(profile: UserProfile): NextConsultation[] {
  const concerns = new Set(profile.concerns)
  const order: SubsidyCategory[] = [
    'housing',
    'medical',
    'education',
    'elderly',
    'employment',
    'income',
    'childcare',
  ]
  return order
    .filter((cat) => !concerns.has(cat))
    .slice(0, 4)
    .map((cat) => CONSULTATION_MAP[cat])
}

export function createInitialState(): ChatState {
  return {
    step: 'greeting',
    profile: { concerns: [] },
    messages: [
      {
        id: 'init',
        role: 'assistant',
        content:
          'こんにちは！**暮らしAIアシスタント**です。\n\nあなたの状況をヒアリングして、使える可能性のある支援制度を個別に案内します。\n\n✅ なぜあなたが対象になるかを説明\n✅ 申請に必要な書類・時間・難易度を表示\n✅ 見落としがちな制度も提案\n\nまずは今のお悩みやライフイベントを教えてください。',
        quickReplies: STARTER_REPLIES,
      },
    ],
  }
}

export function processUserInput(state: ChatState, input: string): ChatState {
  const userMsg: ChatMessage = {
    id: `u-${Date.now()}`,
    role: 'user',
    content: input,
  }

  const addMessages = (...newMsgs: ChatMessage[]): ChatMessage[] => [
    ...state.messages,
    userMsg,
    ...newMsgs,
  ]

  switch (state.step) {
    case 'greeting': {
      const concerns = detectConcerns(input)
      return {
        step: 'ask_age',
        profile: { ...state.profile, concerns },
        messages: addMessages({
          id: `a-${Date.now()}`,
          role: 'assistant',
          content:
            'ご相談ありがとうございます。\nいくつか状況を確認させてください。\n\n**現在のご年齢**はおいくつですか？（数字で入力してください）',
        }),
      }
    }

    case 'done': {
      if (input === '最初に戻る') {
        return {
          step: 'ask_age',
          profile: { concerns: [] },
          messages: addMessages({
            id: `a-${Date.now()}`,
            role: 'assistant',
            content:
              '最初からやり直しましょう！\n\n**現在のご年齢**はおいくつですか？（数字で入力してください）',
          }),
        }
      }

      const concerns = detectConcerns(input)

      // プロフィールが揃っていれば質問をスキップして即結果表示
      if (
        state.profile.age &&
        state.profile.familyStructure &&
        state.profile.employment &&
        state.profile.prefecture
      ) {
        const updatedProfile = { ...state.profile, concerns }
        const finalProfile: UserProfile = {
          age: updatedProfile.age!,
          prefecture: updatedProfile.prefecture!,
          city: '',
          familyStructure: updatedProfile.familyStructure!,
          hasChildren: updatedProfile.hasChildren ?? false,
          childrenCount: (updatedProfile.hasChildren ?? false) ? 1 : 0,
          employment: updatedProfile.employment!,
          incomeRange: '200-400',
          concerns: updatedProfile.concerns,
        }

        const results = filterSubsidies(finalProfile, getAllSubsidies())
        const topResults = results.slice(0, 6)
        const allSubsidies = getAllSubsidies()
        const missed = topResults.length > 0
          ? getMissedSubsidies(finalProfile, topResults, allSubsidies)
          : []
        const nextConsultations = getNextConsultations(finalProfile)

        const hasPrefectureData = topResults.some((r) => r.subsidy.providerLevel === 'prefectural')
        const prefectureNote = hasPrefectureData
          ? `\n\n**${finalProfile.prefecture}の制度**も含めてご案内しています。`
          : ''

        const resultContent =
          topResults.length > 0
            ? `承知しました！前回の情報を引き継いでご案内します。\n\n**${topResults.length}件の制度**が利用できる可能性があります。${prefectureNote}`
            : '現在のデータでは該当する制度が見つかりませんでした。\n条件を変えてもう一度ご相談いただくか、お住まいの市区町村の相談窓口をご利用ください。'

        return {
          step: 'done',
          profile: updatedProfile,
          messages: addMessages({
            id: `a-${Date.now()}`,
            role: 'assistant',
            content: resultContent,
            results: topResults,
            missedSubsidies: missed.length > 0 ? missed : undefined,
            nextConsultations: nextConsultations.length > 0 ? nextConsultations : undefined,
            quickReplies: ['別の相談をする', '最初に戻る'],
          }),
        }
      }

      // プロフィール未完成なら通常の質問フロー
      return {
        step: 'ask_age',
        profile: { ...state.profile, concerns },
        messages: addMessages({
          id: `a-${Date.now()}`,
          role: 'assistant',
          content:
            'ご相談ありがとうございます。\nいくつか状況を確認させてください。\n\n**現在のご年齢**はおいくつですか？（数字で入力してください）',
        }),
      }
    }

    case 'ask_age': {
      const age = parseInt(input.replace(/[^0-9]/g, ''), 10)
      if (!age || age < 1 || age > 120) {
        return {
          ...state,
          messages: addMessages({
            id: `a-${Date.now()}`,
            role: 'assistant',
            content: '年齢を数字で入力してください。\n例：「35」「42歳」',
          }),
        }
      }
      return {
        step: 'ask_family',
        profile: { ...state.profile, age },
        messages: addMessages({
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: 'ありがとうございます。\n**家族構成**を教えてください。',
          quickReplies: ['一人暮らし', '夫婦のみ', '子どもがいる家族', 'ひとり親', '高齢者世帯', 'その他'],
        }),
      }
    }

    case 'ask_family': {
      const familyMap: Record<string, { familyStructure: FamilyStructure; hasChildren: boolean }> =
        {
          '一人暮らし': { familyStructure: 'single', hasChildren: false },
          '夫婦のみ': { familyStructure: 'couple', hasChildren: false },
          '子どもがいる家族': { familyStructure: 'family', hasChildren: true },
          'ひとり親': { familyStructure: 'single_parent', hasChildren: true },
          '高齢者世帯': { familyStructure: 'elderly_single', hasChildren: false },
          'その他': { familyStructure: 'other', hasChildren: false },
        }
      const mapped = familyMap[input] ?? {
        familyStructure: 'other' as FamilyStructure,
        hasChildren: false,
      }
      return {
        step: 'ask_employment',
        profile: { ...state.profile, ...mapped },
        messages: addMessages({
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: 'わかりました。\n現在の**お仕事の状況**を教えてください。',
          quickReplies: ['会社員・公務員', '自営業・フリーランス', '現在無職・求職中', '学生', 'その他'],
        }),
      }
    }

    case 'ask_employment': {
      const employmentMap: Record<string, EmploymentType> = {
        '会社員・公務員': 'employed',
        '自営業・フリーランス': 'self_employed',
        '現在無職・求職中': 'unemployed',
        '学生': 'student',
        'その他': 'employed',
      }
      const employment = employmentMap[input] ?? 'employed'

      return {
        step: 'ask_prefecture',
        profile: { ...state.profile, employment },
        messages: addMessages({
          id: `a-${Date.now()}`,
          role: 'assistant',
          content:
            'ありがとうございます。\n最後に、お住まいの**都道府県**を教えてください。\n地域ごとの制度も合わせてご案内します。',
          quickReplies: [
            '北海道',
            '東京都',
            '神奈川県',
            '埼玉県',
            '千葉県',
            '大阪府',
            '愛知県',
            '福岡県',
            'その他の都道府県',
          ],
        }),
      }
    }

    case 'ask_prefecture': {
      if (input === 'その他の都道府県') {
        return {
          step: 'ask_prefecture_other',
          profile: state.profile,
          messages: addMessages({
            id: `a-${Date.now()}`,
            role: 'assistant',
            content:
              'お住まいの都道府県名を入力してください。\n例：「兵庫県」「京都府」「静岡県」',
          }),
        }
      }

      const prefecture = input

      const finalProfile: UserProfile = {
        age: state.profile.age ?? 30,
        prefecture,
        city: '',
        familyStructure: state.profile.familyStructure ?? 'single',
        hasChildren: state.profile.hasChildren ?? false,
        childrenCount: (state.profile.hasChildren ?? false) ? 1 : 0,
        employment: state.profile.employment ?? 'employed',
        incomeRange: '200-400',
        concerns: state.profile.concerns,
      }

      const results = filterSubsidies(finalProfile, getAllSubsidies())
      const topResults = results.slice(0, 6)
      const allSubsidies = getAllSubsidies()
      const missed = topResults.length > 0
        ? getMissedSubsidies(finalProfile, topResults, allSubsidies)
        : []
      const nextConsultations = getNextConsultations(finalProfile)

      const hasPrefectureData = topResults.some((r) => r.subsidy.providerLevel === 'prefectural')
      const prefectureNote = hasPrefectureData
        ? `\n\n**${prefecture}の制度**も含めてご案内しています。`
        : ''

      const resultContent =
        topResults.length > 0
          ? `ご状況を確認しました。ありがとうございます！\n\n**${topResults.length}件の制度**が利用できる可能性があります。${prefectureNote}`
          : '現在のデータでは該当する制度が見つかりませんでした。\n条件を変えてもう一度ご相談いただくか、お住まいの市区町村の相談窓口をご利用ください。'

      return {
        step: 'done',
        profile: { ...state.profile, prefecture },
        messages: addMessages({
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: resultContent,
          results: topResults,
          missedSubsidies: missed.length > 0 ? missed : undefined,
          nextConsultations: nextConsultations.length > 0 ? nextConsultations : undefined,
          quickReplies: ['別の相談をする', '最初に戻る'],
        }),
      }
    }

    case 'ask_prefecture_other': {
      const prefecture = normalizePrefecture(input)

      const finalProfile: UserProfile = {
        age: state.profile.age ?? 30,
        prefecture,
        city: '',
        familyStructure: state.profile.familyStructure ?? 'single',
        hasChildren: state.profile.hasChildren ?? false,
        childrenCount: (state.profile.hasChildren ?? false) ? 1 : 0,
        employment: state.profile.employment ?? 'employed',
        incomeRange: '200-400',
        concerns: state.profile.concerns,
      }

      const results = filterSubsidies(finalProfile, getAllSubsidies())
      const topResults = results.slice(0, 6)
      const allSubsidies = getAllSubsidies()
      const missed = topResults.length > 0
        ? getMissedSubsidies(finalProfile, topResults, allSubsidies)
        : []
      const nextConsultations = getNextConsultations(finalProfile)

      const hasPrefectureData = topResults.some((r) => r.subsidy.providerLevel === 'prefectural')
      const isKnownPrefecture = (PREFECTURES as readonly string[]).includes(prefecture)
      const prefectureNote = !isKnownPrefecture
        ? `\n\n（「${prefecture}」の都道府県データが見つかりませんでした。都道府県名を正確に入力してください。）`
        : hasPrefectureData
          ? `\n\n**${prefecture}の制度**も含めてご案内しています。`
          : ''

      const resultContent =
        topResults.length > 0
          ? `ご状況を確認しました。ありがとうございます！\n\n**${topResults.length}件の制度**が利用できる可能性があります。${prefectureNote}`
          : '現在のデータでは該当する制度が見つかりませんでした。\n条件を変えてもう一度ご相談いただくか、お住まいの市区町村の相談窓口をご利用ください。'

      return {
        step: 'done',
        profile: { ...state.profile, prefecture },
        messages: addMessages({
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: resultContent,
          results: topResults,
          missedSubsidies: missed.length > 0 ? missed : undefined,
          nextConsultations: nextConsultations.length > 0 ? nextConsultations : undefined,
          quickReplies: ['別の相談をする', '最初に戻る'],
        }),
      }
    }

    default:
      return state
  }
}
