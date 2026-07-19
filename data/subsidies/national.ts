import type { Subsidy } from '@/types/subsidy'

export const nationalSubsidies: Subsidy[] = [
  // ─── 子育て ───────────────────────────────────────────
  {
    id: 'national-001',
    name: '児童手当',
    providerLevel: 'national',
    providerName: '内閣府',
    category: 'childcare',
    tags: ['子育て', '現金給付', '毎月', '中学生以下'],
    shortDescription:
      '中学校修了前（15歳の誕生日後最初の3月31日まで）の子どもを養育している方に毎月支給される手当です。',
    aiSummary: {
      amount: '月額1万〜3万円（子どもの年齢・人数により異なる）',
      targetPeople:
        '中学校修了前の子どもを養育しており、所得要件を満たす方が対象になる可能性があります（2024年10月より所得制限撤廃）',
      deadline: '随時申請可（認定後、申請翌月から支給）',
      requiredDocuments: [
        '認定請求書',
        '請求者名義の預金通帳',
        'マイナンバー確認書類',
        '個人番号カード等',
      ],
      applicationPlace: '住んでいる市区町村の担当窓口（公務員の場合は勤務先）',
      notes: [
        '2024年10月より所得制限が撤廃され、第3子以降は月額3万円に拡充',
        '出生・転入後15日以内に申請すると翌月から支給',
        '毎年6月に現況届の提出が必要な場合がある',
      ],
      difficulty: 2,
      estimatedApplicationTime: '30〜60分',
    },
    conditions: { hasChildren: true },
    officialUrl: 'https://www.cfa.go.jp/policies/kokoseido/jidouteate/',
    lastUpdated: '2024-10-01',
  },
  {
    id: 'national-002',
    name: '育児休業給付金',
    providerLevel: 'national',
    providerName: '厚生労働省（ハローワーク）',
    category: 'childcare',
    tags: ['子育て', '育休', '給付金', '雇用保険'],
    shortDescription:
      '育児休業を取得した雇用保険の被保険者に対し、休業前賃金の一定割合を支給する制度です。',
    aiSummary: {
      amount: '休業開始から6ヶ月間は賃金日額の67%、その後50%',
      targetPeople:
        '雇用保険に加入しており、1歳未満（最長2歳まで延長可）の子の育児休業を取得した会社員・公務員等が対象になる可能性があります',
      deadline: '育児休業終了後2年以内に申請',
      requiredDocuments: ['育児休業給付金支給申請書', '賃金台帳', '出勤簿', '母子手帳'],
      applicationPlace: '管轄のハローワーク（事業主経由での申請が一般的）',
      notes: [
        '雇用保険の加入期間が一定以上必要（原則2年間に11日以上働いた月が12ヶ月以上）',
        '自営業・フリーランスは対象外',
        '2025年以降、給付率が手取りの実質10割相当に拡充予定',
      ],
      difficulty: 3,
      estimatedApplicationTime: '1〜2時間（事業主経由）',
    },
    conditions: { hasChildren: true, employmentTypes: ['employed'] },
    officialUrl: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000130583.html',
    lastUpdated: '2024-04-01',
  },
  {
    id: 'national-003',
    name: '出産育児一時金',
    providerLevel: 'national',
    providerName: '厚生労働省（健康保険）',
    category: 'childcare',
    tags: ['出産', '一時金', '健康保険', '国民健康保険'],
    shortDescription:
      '健康保険・国民健康保険に加入している方が出産した際に、子ども1人につき50万円が支給される制度です。',
    aiSummary: {
      amount: '子ども1人につき50万円（双子の場合は100万円）',
      targetPeople:
        '健康保険または国民健康保険に加入しており、妊娠4ヶ月（85日）以上の出産をした方が対象になる可能性があります',
      deadline: '出産後2年以内に申請',
      requiredDocuments: [
        '支給申請書',
        '医療機関等が発行した出産費用の領収・明細書（直接支払制度を使う場合は不要）',
      ],
      applicationPlace: '加入している健康保険組合または市区町村の国民健康保険窓口',
      notes: [
        '多くの医療機関では「直接支払制度」により病院側へ直接支給されるため窓口負担が減る',
        '死産・流産でも妊娠4ヶ月以降は対象',
        '出産費用が50万円を下回る場合は差額を受け取れる',
      ],
      difficulty: 2,
      estimatedApplicationTime: '30分以内（直接支払制度利用時）',
    },
    conditions: { ageMax: 55 },
    officialUrl:
      'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/juuyou/otanjoubi.html',
    lastUpdated: '2023-04-01',
  },
  {
    id: 'national-013',
    name: '児童扶養手当',
    providerLevel: 'national',
    providerName: '厚生労働省',
    category: 'income',
    tags: ['ひとり親', '手当', '現金給付', '離婚', '未婚'],
    shortDescription:
      'ひとり親家庭等の生活の安定と自立を助けるため、子どもを養育している父・母または養育者に支給される手当です。',
    aiSummary: {
      amount: '第1子 月額最大44,140円、第2子 加算10,420円（2024年度額・所得により異なる）',
      targetPeople:
        '18歳未満の子を養育するひとり親家庭の親（または養育者）で、所得が一定以下の方が対象になる可能性があります',
      deadline: '随時申請可（認定後翌月から支給）',
      requiredDocuments: [
        '認定請求書',
        '戸籍謄本',
        '住民票',
        '所得証明書',
        '預金通帳',
        'マイナンバー確認書類',
      ],
      applicationPlace: '住んでいる市区町村の担当窓口',
      notes: [
        '所得制限あり（受給資格者本人・扶養義務者の所得で判定）',
        '年2回（8月・11月・翌年2月）に4ヶ月分ずつ支給',
        '毎年8月に現況届の提出が必要',
      ],
      difficulty: 2,
      estimatedApplicationTime: '60〜90分',
    },
    conditions: { hasChildren: true, familyStructures: ['single_parent'] },
    officialUrl:
      'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kodomo/kodomo_kosodate/jidoufuyouteate/index.html',
    lastUpdated: '2024-04-01',
  },
  {
    id: 'national-014',
    name: '特別児童扶養手当',
    providerLevel: 'national',
    providerName: '厚生労働省',
    category: 'disability',
    tags: ['障がい児', '手当', '現金給付', '子育て'],
    shortDescription:
      '精神または身体に中程度以上の障害を有する20歳未満の子を養育する父母等に支給される手当です。',
    aiSummary: {
      amount: '1級：月額53,700円、2級：月額35,760円（2024年度）',
      targetPeople:
        '20歳未満の障がい児を養育する父母等で、所得が一定以下の方が対象になる可能性があります（障害の程度が1級または2級）',
      deadline: '随時申請可',
      requiredDocuments: [
        '認定請求書',
        '医師の診断書',
        '戸籍謄本',
        '住民票',
        '所得証明書',
        'マイナンバー確認書類',
      ],
      applicationPlace: '住んでいる市区町村の担当窓口',
      notes: [
        '障害の程度は身体障害者手帳の等級とは異なる場合がある',
        '年3回（4月・8月・12月）に前月分までまとめて支給',
        '毎年8月に所得状況届の提出が必要',
      ],
      difficulty: 3,
      estimatedApplicationTime: '1〜2時間（診断書の取得含む）',
    },
    conditions: { hasChildren: true },
    officialUrl:
      'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kodomo/kodomo_kosodate/tokubetsu_jidou/index.html',
    lastUpdated: '2024-04-01',
  },
  {
    id: 'national-015',
    name: '幼児教育・保育の無償化',
    providerLevel: 'national',
    providerName: 'こども家庭庁',
    category: 'childcare',
    tags: ['幼稚園', '保育所', '認定こども園', '3〜5歳', '無償'],
    shortDescription:
      '3〜5歳のすべての子どもと、0〜2歳の住民税非課税世帯の子どもの保育料を無償化する制度です。',
    aiSummary: {
      amount: '認可保育所・幼稚園等の保育料が無償（給食費・教材費等は別途）',
      targetPeople:
        '3〜5歳のお子さんがいるすべての家庭、または0〜2歳で住民税非課税世帯の方が対象になる可能性があります',
      deadline: '在園中の随時申請（施設を通じて手続き）',
      requiredDocuments: [
        '支給認定申請書（施設経由）',
        'マイナンバー確認書類',
        '保育が必要な事由の証明書類（0〜2歳の場合）',
      ],
      applicationPlace: '子どもが通う施設または市区町村担当窓口',
      notes: [
        '認可外保育施設も上限額の範囲内で無償化の対象',
        '幼稚園の預かり保育も一定条件で無償化の対象',
        '給食費（主食費・副食費）は原則として保護者負担',
      ],
      difficulty: 1,
      estimatedApplicationTime: '30分以内（施設経由）',
    },
    conditions: { hasChildren: true },
    officialUrl: 'https://www.cfa.go.jp/policies/kokoseido/mushouka/',
    lastUpdated: '2024-04-01',
  },
  {
    id: 'national-025',
    name: '子育て世帯生活支援特別給付金',
    providerLevel: 'national',
    providerName: '厚生労働省',
    category: 'income',
    tags: ['ひとり親', '給付金', '低所得', '子育て', '一時金'],
    shortDescription:
      '低所得のひとり親家庭等に対して、子ども1人につき5万円を支給する臨時の給付金です。',
    aiSummary: {
      amount: '児童1人につき5万円（一時金）',
      targetPeople:
        '低所得のひとり親家庭等（児童扶養手当受給者や家計急変世帯等）で、18歳未満の子を養育する方が対象になる可能性があります',
      deadline: '実施時期により異なる（制度実施時に市区町村から案内が届く）',
      requiredDocuments: [
        '申請書（市区町村窓口でもらえる）',
        '収入状況の証明書類',
        '通帳の写し',
      ],
      applicationPlace: '住んでいる市区町村の担当窓口',
      notes: [
        '家計急変によって低所得になった場合も申請可能',
        '物価高騰の影響を受けた低所得世帯への支援として実施',
        '実施時期は年度・情勢により変わることがある',
      ],
      difficulty: 2,
      estimatedApplicationTime: '30〜60分',
    },
    conditions: { hasChildren: true, familyStructures: ['single_parent'] },
    officialUrl:
      'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kodomo/kodomo_kosodate/rikon/kyuufukin.html',
    lastUpdated: '2024-01-01',
  },
  {
    id: 'national-028',
    name: '産前産後休業中の社会保険料免除',
    providerLevel: 'national',
    providerName: '日本年金機構',
    category: 'childcare',
    tags: ['産休', '出産', '社会保険料', '免除', '保険料'],
    shortDescription:
      '産前産後休業を取得した期間中、本人および事業主負担の社会保険料（健康保険・厚生年金保険）が全額免除される制度です。',
    aiSummary: {
      amount: '産休期間中の健康保険料・厚生年金保険料が全額免除（収入に応じて異なる）',
      targetPeople:
        '健康保険・厚生年金に加入している会社員・公務員等で、産前42日（多胎98日）〜産後56日の産前産後休業を取得した方が対象になる可能性があります',
      deadline: '産前産後休業中または終了後に事業主経由で申請',
      requiredDocuments: ['産前産後休業取得者申出書（事業主が年金事務所へ提出）'],
      applicationPlace: '事業主を通じて年金事務所または健康保険組合へ届け出',
      notes: [
        '免除期間は将来の年金額に不利にならない（保険料を納付したとみなされる）',
        '自営業・フリーランスは国民健康保険・国民年金のため対象外',
        '育児休業期間中の保険料免除制度も別途あり',
      ],
      difficulty: 1,
      estimatedApplicationTime: '事業主が手続きするため本人の手間はほぼなし',
    },
    conditions: { hasChildren: true, employmentTypes: ['employed'] },
    officialUrl:
      'https://www.nenkin.go.jp/service/kounen/hokenryo-kankei/menjo/20140327.html',
    lastUpdated: '2024-01-01',
  },

  // ─── 医療 ───────────────────────────────────────────
  {
    id: 'national-004',
    name: '高額療養費制度',
    providerLevel: 'national',
    providerName: '厚生労働省',
    category: 'medical',
    tags: ['医療費', '上限', '健康保険', '国民健康保険', '還付'],
    shortDescription:
      '1ヶ月の医療費（自己負担額）が一定の上限額を超えた場合、超えた分が払い戻される制度です。',
    aiSummary: {
      amount:
        '所得により上限が異なる（例：年収〜370万円の方は月57,600円、70歳未満の住民税非課税者は月35,400円）',
      targetPeople:
        '健康保険または国民健康保険に加入しており、1ヶ月の医療費が上限額を超えた方が対象になる可能性があります',
      deadline: '診療月の翌月から2年以内',
      requiredDocuments: ['高額療養費支給申請書', '診療報酬明細書または領収書', '健康保険証'],
      applicationPlace: '加入している健康保険組合または市区町村の国民健康保険担当窓口',
      notes: [
        '「限度額適用認定証」を事前に取得すると窓口での支払いが上限額のみになり便利',
        '同一世帯で複数人が高額医療を受けた場合に合算できる制度もある',
        '年収・年齢によって上限額が大きく異なる',
      ],
      difficulty: 2,
      estimatedApplicationTime: '30〜60分',
    },
    conditions: {},
    officialUrl:
      'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/juuyou/kougakuiryou/index.html',
    lastUpdated: '2024-01-01',
  },
  {
    id: 'national-005',
    name: '傷病手当金',
    providerLevel: 'national',
    providerName: '厚生労働省（健康保険）',
    category: 'medical',
    tags: ['病気', 'ケガ', '休職', '給与補填', '健康保険'],
    shortDescription:
      '病気やケガで仕事を休んだ際、給与の約3分の2を最長1年6ヶ月支給する制度です。',
    aiSummary: {
      amount: '直近12ヶ月の平均給与日額の約3分の2（日割り計算）',
      targetPeople:
        '健康保険に加入している会社員・公務員等で、病気やケガで4日以上連続して仕事を休んだ方が対象になる可能性があります',
      deadline: '療養のため休んだ日の翌日から2年以内',
      requiredDocuments: ['傷病手当金支給申請書', '医師の意見書', '事業主の証明'],
      applicationPlace: '加入している健康保険組合または協会けんぽ',
      notes: [
        '連続3日間休んだ後、4日目から支給対象（最初の3日間は「待期期間」）',
        '最長1年6ヶ月（通算）支給',
        '国民健康保険には傷病手当金制度なし（一部自治体を除く）',
      ],
      difficulty: 3,
      estimatedApplicationTime: '1〜2時間（書類収集含む）',
    },
    conditions: { employmentTypes: ['employed'] },
    officialUrl: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/juuyou/kofukin.html',
    lastUpdated: '2024-01-01',
  },
  {
    id: 'national-019',
    name: '指定難病医療費助成制度',
    providerLevel: 'national',
    providerName: '厚生労働省',
    category: 'medical',
    tags: ['難病', '指定難病', '医療費', '助成', '自己負担上限'],
    shortDescription:
      '国が指定した338疾患（指定難病）の患者に対して、医療費の自己負担を軽減する助成制度です。',
    aiSummary: {
      amount: '所得に応じた自己負担上限月額（例：低所得者は月0〜5,000円、一般は月10,000〜30,000円）',
      targetPeople:
        '医師に指定難病と診断され、一定の重症度基準を満たす方が対象になる可能性があります（338疾患が対象）',
      deadline: '随時申請可（認定日は申請受理日に遡ることが多い）',
      requiredDocuments: [
        '支給認定申請書',
        '診断書（指定医が作成）',
        '住民票',
        '所得課税証明書',
        '健康保険証の写し',
      ],
      applicationPlace: '住んでいる都道府県の窓口（保健所等）',
      notes: [
        '指定難病の一覧は厚生労働省のホームページで確認できる',
        '軽症の場合は対象外になることがある（重症度基準あり）',
        '認定された場合は「医療受給者証」が交付される',
      ],
      difficulty: 3,
      estimatedApplicationTime: '1〜2時間（指定医の受診含む）',
    },
    conditions: {},
    officialUrl: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000084783.html',
    lastUpdated: '2024-04-01',
  },
  {
    id: 'national-020',
    name: '自立支援医療制度',
    providerLevel: 'national',
    providerName: '厚生労働省',
    category: 'medical',
    tags: ['精神科', '通院', '医療費', '自己負担', '1割'],
    shortDescription:
      '精神疾患の通院治療や身体障害の手術・訓練に要する医療費を、原則1割の自己負担に軽減する制度です。',
    aiSummary: {
      amount: '医療費の自己負担が原則3割から1割に軽減（所得に応じた月額上限あり）',
      targetPeople:
        '精神疾患で継続的に通院が必要な方（精神通院医療）、身体障害がある方（更生医療）、育成医療の対象となる18歳未満の方などが対象になる可能性があります',
      deadline: '随時申請可（有効期間は1年、更新が必要）',
      requiredDocuments: [
        '支給認定申請書',
        '医師の診断書',
        '健康保険証の写し',
        'マイナンバー確認書類',
      ],
      applicationPlace: '住んでいる市区町村の担当窓口（または都道府県窓口）',
      notes: [
        '精神通院医療は最も利用者が多く、うつ病・統合失調症なども対象',
        '所得に応じて月額上限が設定されており、一定以上の所得者は対象外になる場合がある',
        '指定医療機関での受診が必要（かかりつけ医が指定機関かどうか要確認）',
      ],
      difficulty: 2,
      estimatedApplicationTime: '60〜90分（診断書の取得含む）',
    },
    conditions: {},
    officialUrl:
      'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/jiritsu/index.html',
    lastUpdated: '2024-01-01',
  },

  // ─── 雇用・就労 ───────────────────────────────────────
  {
    id: 'national-006',
    name: '雇用保険（失業等給付）',
    providerLevel: 'national',
    providerName: '厚生労働省（ハローワーク）',
    category: 'employment',
    tags: ['失業', '求職', 'ハローワーク', '給付金', '基本手当'],
    shortDescription:
      '雇用保険に加入していた方が失業した際、求職活動中の生活を支えるために支給される給付です。',
    aiSummary: {
      amount: '離職前賃金日額の50〜80%（年齢・賃金額による）',
      targetPeople:
        '雇用保険に一定期間加入しており、離職して就職の意思と能力があるが就職できない状態の方が対象になる可能性があります',
      deadline: '離職翌日から1年以内（受給期間内に申請）',
      requiredDocuments: [
        '雇用保険被保険者離職票（1・2）',
        '個人番号確認書類',
        '身元確認書類',
        '写真2枚（3cm×2.5cm）',
        '預金通帳またはキャッシュカード',
      ],
      applicationPlace: '住所管轄のハローワーク',
      notes: [
        '給付日数は被保険者期間・離職理由・年齢により異なる（90〜360日）',
        '4週間に1回の求職活動報告と認定が必要',
        '自己都合退職の場合は2〜3ヶ月の給付制限期間あり',
      ],
      difficulty: 3,
      estimatedApplicationTime: '2〜3時間（ハローワーク来所）',
    },
    conditions: { employmentTypes: ['unemployed'] },
    officialUrl:
      'https://www.hellowork.mhlw.go.jp/insurance/insurance_basicbenefit.html',
    lastUpdated: '2024-01-01',
  },
  {
    id: 'national-016',
    name: '教育訓練給付金',
    providerLevel: 'national',
    providerName: '厚生労働省（ハローワーク）',
    category: 'employment',
    tags: ['スキルアップ', '資格', '給付金', '雇用保険', '専門学校'],
    shortDescription:
      'スキルアップのために対象の講座を受講した際、受講費用の一部（20〜70%）が支給される制度です。',
    aiSummary: {
      amount:
        '一般教育訓練：受講費用の20%（上限10万円）／専門実践：受講費用の50〜70%（上限168万円）',
      targetPeople:
        '雇用保険の被保険者（在職中）または離職後1年以内の方で、支給要件を満たす対象講座を受講する方が対象になる可能性があります',
      deadline: '受講開始1ヶ月前にハローワークへ確認・手続きが必要',
      requiredDocuments: [
        '教育訓練給付金支給申請書',
        '受講証明書または修了証明書',
        '領収書',
        '雇用保険被保険者証',
      ],
      applicationPlace: '住所管轄のハローワーク',
      notes: [
        '対象講座はTOEIC・簿記・介護・ITなど幅広い（厚生労働省の指定講座を要確認）',
        '専門実践教育訓練では月2万円の追加給付（教育訓練支援給付金）もある場合あり',
        '受講開始前にキャリアコンサルティングが必要な場合がある',
      ],
      difficulty: 2,
      estimatedApplicationTime: '60〜90分（事前相談含む）',
    },
    conditions: { employmentTypes: ['employed', 'unemployed'] },
    officialUrl:
      'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/jinzaikaihatsu/kyouiku.html',
    lastUpdated: '2024-04-01',
  },
  {
    id: 'national-017',
    name: '求職者支援制度（職業訓練受講給付金）',
    providerLevel: 'national',
    providerName: '厚生労働省（ハローワーク）',
    category: 'employment',
    tags: ['職業訓練', '給付金', '無料', '求職者', 'スキルアップ'],
    shortDescription:
      '雇用保険を受給できない求職者が、無料の職業訓練を受けながら月10万円の給付金を受け取れる制度です。',
    aiSummary: {
      amount: '月額10万円（訓練受講手当）＋交通費支給',
      targetPeople:
        '雇用保険を受給できない（または受給が終了した）求職者で、一定の要件（収入・資産等）を満たす方が対象になる可能性があります',
      deadline: '随時申請可（ハローワークに相談の上、訓練コースを選択）',
      requiredDocuments: [
        '職業訓練受講給付金支給申請書',
        '収入状況申告書',
        '金融機関の通帳の写し',
        '住民票',
      ],
      applicationPlace: '住所管轄のハローワーク',
      notes: [
        '訓練コースはIT・医療事務・ビジネス系など多数あり、受講料無料',
        '訓練期間は2〜6ヶ月が一般的',
        '世帯収入・資産等の要件あり（ハローワークで確認が必要）',
      ],
      difficulty: 2,
      estimatedApplicationTime: '1〜2時間（ハローワーク相談含む）',
    },
    conditions: { employmentTypes: ['unemployed'] },
    officialUrl:
      'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/kyuusyokusha/index.html',
    lastUpdated: '2024-04-01',
  },
  {
    id: 'national-018',
    name: '再就職手当',
    providerLevel: 'national',
    providerName: '厚生労働省（ハローワーク）',
    category: 'employment',
    tags: ['再就職', '手当', '雇用保険', '早期', '就職'],
    shortDescription:
      '雇用保険の基本手当の受給中に早期に就職した場合、残日数に応じた一時金が支給される制度です。',
    aiSummary: {
      amount: '所定給付日数の残日数×基本手当日額×60〜70%（残日数が多いほど給付率が高い）',
      targetPeople:
        '雇用保険の基本手当を受給中に、所定給付日数の3分の1以上を残して再就職した方が対象になる可能性があります',
      deadline: '採用日から1ヶ月以内にハローワークへ申請',
      requiredDocuments: [
        '再就職手当支給申請書',
        '雇用保険受給資格者証',
        '採用証明書（就職先が記載）',
      ],
      applicationPlace: '住所管轄のハローワーク',
      notes: [
        '所定給付日数の残日数が1/3以上で60%、2/3以上で70%の給付率',
        '1年以上の雇用が見込まれる職に就いた場合が条件',
        'ハローワークやその紹介によらない就職でも原則対象',
      ],
      difficulty: 2,
      estimatedApplicationTime: '60〜90分',
    },
    conditions: { employmentTypes: ['unemployed'] },
    officialUrl: 'https://www.hellowork.mhlw.go.jp/insurance/insurance_saishushoku.html',
    lastUpdated: '2024-04-01',
  },
  {
    id: 'national-026',
    name: '就業促進定着手当',
    providerLevel: 'national',
    providerName: '厚生労働省（ハローワーク）',
    category: 'employment',
    tags: ['再就職', '定着', '手当', '賃金低下', '雇用保険'],
    shortDescription:
      '再就職後に前職より賃金が下がった場合、差額の一部を補填する手当が6ヶ月経過後に支給されます。',
    aiSummary: {
      amount: '再就職後6ヶ月間の賃金低下分の40〜60%（再就職手当の給付率により異なる）',
      targetPeople:
        '再就職手当を受給した方が、その後6ヶ月同一の事業主に雇用され続け、かつ再就職後の賃金が離職前より低下している方が対象になる可能性があります',
      deadline: '再就職後6ヶ月を経過した日の翌日から1ヶ月以内に申請',
      requiredDocuments: [
        '就業促進定着手当支給申請書',
        '再就職先の給与明細書（6ヶ月分）',
        '雇用保険受給資格者証',
      ],
      applicationPlace: '住所管轄のハローワーク',
      notes: [
        '再就職手当を受けた人だけが対象（セットで確認を推奨）',
        '6ヶ月間雇用が継続していることが条件',
        '申請を忘れやすいので再就職後にカレンダーにメモを',
      ],
      difficulty: 2,
      estimatedApplicationTime: '30〜60分',
    },
    conditions: { employmentTypes: ['unemployed'] },
    officialUrl: 'https://www.hellowork.mhlw.go.jp/insurance/insurance_saishushoku.html',
    lastUpdated: '2024-04-01',
  },

  // ─── 教育 ───────────────────────────────────────────
  {
    id: 'national-008',
    name: '高等学校等就学支援金',
    providerLevel: 'national',
    providerName: '文部科学省',
    category: 'education',
    tags: ['高校', '授業料', '無償化', '教育', '私立'],
    shortDescription:
      '高等学校等に在籍する生徒の授業料の一部または全部を支援する制度です。条件を満たせば私立高校も対象です。',
    aiSummary: {
      amount: '公立高校相当額（月9,900円）〜最大4.6万円/月（私立・低所得世帯）',
      targetPeople:
        '高等学校等に在籍する生徒の保護者で、世帯年収が約910万円未満の方が対象になる可能性があります',
      deadline: '毎年度申請（学校を通じて申請）',
      requiredDocuments: ['学校を通じて提出（保護者のマイナンバー等）'],
      applicationPlace: '在籍している高等学校等（保護者が役所に行く必要なし）',
      notes: [
        '世帯年収約590万円未満の場合、私立高校もほぼ無償化',
        '通信制高校・専修学校も対象',
        '学校が申請手続きを代行するため保護者の負担が少ない',
      ],
      difficulty: 1,
      estimatedApplicationTime: '30分以内（学校経由）',
      deadlineDate: '2027-03-31',
    },
    conditions: { hasChildren: true },
    officialUrl: 'https://www.mext.go.jp/a_menu/shotou/mushouka/index.htm',
    lastUpdated: '2024-04-01',
  },
  {
    id: 'national-010',
    name: '就学援助制度',
    providerLevel: 'national',
    providerName: '文部科学省（市区町村教育委員会）',
    category: 'education',
    tags: ['小学校', '中学校', '給食費', '学用品', '修学旅行'],
    shortDescription:
      '経済的な理由で小・中学校への就学が困難な家庭に、学用品費や給食費等を援助する制度です。',
    aiSummary: {
      amount: '学用品費・給食費・修学旅行費等（品目・金額は自治体により異なる）',
      targetPeople:
        '小・中学校に通う子どもがいる家庭で、生活保護受給世帯またはそれに準じる経済的困窮状態の方が対象になる可能性があります',
      deadline: '毎年度申請（通常4〜5月頃）、年度途中でも申請可能',
      requiredDocuments: [
        '申請書（学校または教育委員会でもらえる）',
        '収入証明書（源泉徴収票等）',
        '通帳の写し',
      ],
      applicationPlace: '子どもが通う学校または市区町村教育委員会',
      notes: [
        '認定基準・支援内容は市区町村により大きく異なる',
        '生活保護受給世帯は自動的に対象',
        '申請しないと受けられないので、困っている場合は学校に相談を',
      ],
      difficulty: 2,
      estimatedApplicationTime: '30〜60分',
      deadlineDate: '2026-09-30',
    },
    conditions: { hasChildren: true },
    officialUrl: 'https://www.mext.go.jp/a_menu/shotou/career/05010502/001.htm',
    lastUpdated: '2024-04-01',
  },
  {
    id: 'national-023',
    name: '日本学生支援機構 給付型奨学金',
    providerLevel: 'national',
    providerName: '日本学生支援機構（JASSO）',
    category: 'education',
    tags: ['奨学金', '大学', '給付型', '返還不要', '低所得'],
    shortDescription:
      '低所得世帯の学生に対して、返還不要の奨学金を支給する制度です。大学・短大・専修学校等が対象です。',
    aiSummary: {
      amount: '月額17,500円〜75,800円（家庭状況・学校種別・自宅通学の有無により異なる）',
      targetPeople:
        '住民税非課税世帯またはそれに準じる低所得世帯で、進学先での学習意欲が認められる学生が対象になる可能性があります',
      deadline: '進学前に予約採用（在学中も随時採用あり）',
      requiredDocuments: [
        '奨学金申込書（学校経由）',
        '収入に関する証明書類（家族分）',
        '成績証明書',
        'マイナンバー確認書類',
      ],
      applicationPlace: '在籍している学校の奨学金担当窓口',
      notes: [
        '高等教育の修学支援新制度（授業料減免）とセットで支給されることが多い',
        '在学中の成績基準を満たさないと支給が停止になる場合がある',
        '高校3年生時に予約採用申請すると進学後にスムーズ',
      ],
      difficulty: 2,
      estimatedApplicationTime: '1〜2時間（学校窓口相談含む）',
    },
    conditions: { employmentTypes: ['student'], ageMax: 35 },
    officialUrl: 'https://www.jasso.or.jp/shogakukin/about/kyufu/',
    lastUpdated: '2024-04-01',
  },
  {
    id: 'national-024',
    name: '高等教育の修学支援新制度',
    providerLevel: 'national',
    providerName: '文部科学省',
    category: 'education',
    tags: ['大学', '授業料減免', '低所得', '給付型', '修学支援'],
    shortDescription:
      '低所得世帯の大学・短大・専修学校等の学生に対して、授業料等の減免と給付型奨学金を合わせて支援する制度です。',
    aiSummary: {
      amount: '授業料等減免（上限年最大約70万円）＋給付型奨学金（月最大75,800円）',
      targetPeople:
        '住民税非課税世帯またはそれに準じる世帯（目安：年収270〜380万円以下）の学生が対象になる可能性があります',
      deadline: '進学前に予約採用または在学中の随時申請',
      requiredDocuments: [
        '学校に提出する申込書類',
        '保護者の収入証明書類',
        'マイナンバー関連書類',
      ],
      applicationPlace: '在籍している大学・短大・専修学校等',
      notes: [
        '授業料減免とJASSO給付型奨学金がセットで支給',
        'JASSO給付型奨学金とは別枠（両方を組み合わせて受給可能）',
        '家計の急変があった場合は緊急採用制度もある',
      ],
      difficulty: 2,
      estimatedApplicationTime: '1〜2時間（学校窓口相談含む）',
    },
    conditions: { employmentTypes: ['student'], ageMax: 35 },
    officialUrl: 'https://www.mext.go.jp/a_menu/koutou/hutankeigen/index.htm',
    lastUpdated: '2024-04-01',
  },
  {
    id: 'national-030',
    name: '母子家庭等自立支援教育訓練給付金',
    providerLevel: 'national',
    providerName: '厚生労働省（市区町村）',
    category: 'education',
    tags: ['ひとり親', '資格取得', '給付金', '教育訓練', '自立支援'],
    shortDescription:
      'ひとり親家庭の親が就職に役立つ資格・スキルを取得するための講座を受講した際、費用の一部を支給します。',
    aiSummary: {
      amount: '対象講座の受講費用の60%（最大20万円、専門実践は最大160万円）',
      targetPeople:
        '児童扶養手当を受給中または同等の所得水準にある、ひとり親家庭の親が対象になる可能性があります',
      deadline: '講座修了後1年以内に申請（事前相談・指定が必要）',
      requiredDocuments: [
        '申請書',
        '受講証明書・修了証明書',
        '領収書',
        '収入証明書類',
        '戸籍謄本',
      ],
      applicationPlace: '住んでいる市区町村の担当窓口（福祉事務所等）',
      notes: [
        '受講開始前に必ず市区町村に相談して指定を受ける必要がある',
        '対象講座はパソコン・介護・調理・医療事務など幅広い',
        '教育訓練給付制度（ハローワーク）と組み合わせてお得に利用できる場合がある',
      ],
      difficulty: 2,
      estimatedApplicationTime: '1〜2時間（事前相談含む）',
    },
    conditions: { hasChildren: true, familyStructures: ['single_parent'] },
    officialUrl:
      'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kodomo/kodomo_kosodate/hitorioya/index.html',
    lastUpdated: '2024-04-01',
  },

  // ─── 障がい ───────────────────────────────────────────
  {
    id: 'national-007',
    name: '障害年金',
    providerLevel: 'national',
    providerName: '日本年金機構',
    category: 'disability',
    tags: ['障がい', '年金', '精神', '身体', '支給'],
    shortDescription:
      '病気やケガで一定の障害状態になった方に支給される年金です。働けない場合でも受給できます。',
    aiSummary: {
      amount: '障害基礎年金：1級 約99万円/年、2級 約79万円/年（2024年度）',
      targetPeople:
        '初診日に年金に加入しており、一定の保険料納付要件を満たし、障害認定日に一定以上の障害状態にある方が対象になる可能性があります',
      deadline: '5年以内に請求することで過去分も受給可能',
      requiredDocuments: [
        '年金請求書',
        '診断書（初診日から1年6ヶ月後に作成）',
        '病歴・就労状況等申立書',
        '戸籍謄本',
        '年金手帳またはマイナンバー確認書類',
      ],
      applicationPlace: '市区町村の年金窓口または年金事務所',
      notes: [
        '初診日要件・保険料納付要件の確認が必要（事前に相談を推奨）',
        '20歳前の傷病による障害は保険料納付要件不要',
        '精神疾患・難病なども対象になる場合がある',
      ],
      difficulty: 5,
      estimatedApplicationTime: '数日〜数週間（書類準備期間）',
    },
    conditions: {},
    officialUrl:
      'https://www.nenkin.go.jp/service/jukyu/shougainenkin/jukyu-yoken/20150514.html',
    lastUpdated: '2024-01-01',
  },
  {
    id: 'national-027',
    name: '障害者総合支援法による福祉サービス',
    providerLevel: 'national',
    providerName: '厚生労働省（市区町村）',
    category: 'disability',
    tags: ['障がい', '福祉サービス', '介護給付', '訓練', '日常生活'],
    shortDescription:
      '障害のある方が日常生活や社会生活を送るための多様なサービス（居宅介護・就労支援・グループホーム等）を原則1割負担で利用できます。',
    aiSummary: {
      amount: 'サービス利用料の原則1割負担（所得に応じた月額上限あり、低所得者は0円の場合も）',
      targetPeople:
        '身体・知的・精神・発達障害のある方、または難病患者で支援が必要な方が対象になる可能性があります（障害者手帳がなくても申請可能な場合あり）',
      deadline: '随時申請可（市区町村に相談から始める）',
      requiredDocuments: [
        '支給申請書（市区町村窓口でもらえる）',
        '医師の意見書（サービスにより必要）',
        '障害者手帳（持っている場合）',
        'マイナンバー確認書類',
      ],
      applicationPlace: '住んでいる市区町村の障害福祉担当窓口',
      notes: [
        '利用できるサービス内容は障害支援区分の認定（区分1〜6）で決まる',
        'サービス等利用計画（ケアプラン）の作成が必要',
        'まずは市区町村の相談支援専門員に相談すると手続きがスムーズ',
      ],
      difficulty: 3,
      estimatedApplicationTime: '1〜2時間（窓口相談・認定調査含む）',
    },
    conditions: {},
    officialUrl:
      'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/service/index.html',
    lastUpdated: '2024-04-01',
  },

  // ─── 高齢・介護 ───────────────────────────────────────
  {
    id: 'national-011',
    name: '年金生活者支援給付金',
    providerLevel: 'national',
    providerName: '日本年金機構',
    category: 'elderly',
    tags: ['年金', '高齢者', '低所得', '給付金', '65歳以上'],
    shortDescription:
      '公的年金等の収入や所得が一定基準以下の年金受給者の生活を支援するための給付金です。',
    aiSummary: {
      amount: '老齢年金生活者支援給付金：月額最大5,310円（基準額・2024年度）',
      targetPeople:
        '65歳以上で老齢基礎年金を受給しており、前年の公的年金収入とその他所得の合計が約88万円以下の方が対象になる可能性があります',
      deadline: '随時申請可（日本年金機構から案内が届いたら申請）',
      requiredDocuments: ['請求書（日本年金機構から送付される）'],
      applicationPlace: '日本年金機構（電話・郵送・年金事務所）',
      notes: [
        '毎年度、前年の所得により受給の可否が変わる',
        '障害・遺族年金受給者向けの給付金もある',
        '自動的に支給されるのではなく、初回は申請が必要',
      ],
      difficulty: 2,
      estimatedApplicationTime: '30分以内（書類が届いたら）',
    },
    conditions: { ageMin: 65 },
    officialUrl: 'https://www.nenkin.go.jp/service/jukyu/kyufukin/20190726.html',
    lastUpdated: '2024-01-01',
  },
  {
    id: 'national-021',
    name: '介護休業給付金',
    providerLevel: 'national',
    providerName: '厚生労働省（ハローワーク）',
    category: 'elderly',
    tags: ['介護', '休業', '給付金', '雇用保険', '家族介護'],
    shortDescription:
      '要介護状態の家族を介護するために休業を取得した場合、休業前賃金の67%を最長93日間受け取れます。',
    aiSummary: {
      amount: '休業開始前の賃金日額×67%（通算93日、3回まで分割取得可）',
      targetPeople:
        '雇用保険に加入している会社員・公務員等で、要介護状態の対象家族を介護するため介護休業を取得した方が対象になる可能性があります',
      deadline: '介護休業終了日から2年以内に申請',
      requiredDocuments: [
        '介護休業給付金支給申請書',
        '賃金台帳・出勤簿',
        '介護休業取得を証明する書類（事業主の証明）',
      ],
      applicationPlace: '事業主経由でハローワーク（または直接ハローワーク）',
      notes: [
        '対象家族は配偶者・父母・子・祖父母・兄弟姉妹・孫・配偶者の父母',
        '「要介護状態」は介護保険の認定がなくても該当する場合がある',
        '短時間勤務や残業免除の制度も別途あり（育児介護休業法）',
      ],
      difficulty: 3,
      estimatedApplicationTime: '1〜2時間（事業主経由）',
    },
    conditions: { employmentTypes: ['employed'] },
    officialUrl: 'https://www.hellowork.mhlw.go.jp/insurance/insurance_kaigo.html',
    lastUpdated: '2024-04-01',
  },
  {
    id: 'national-022',
    name: '高額介護サービス費',
    providerLevel: 'national',
    providerName: '厚生労働省（市区町村）',
    category: 'elderly',
    tags: ['介護', '上限', '返金', '介護保険', '高齢者'],
    shortDescription:
      '1ヶ月に支払った介護サービスの自己負担額が上限を超えた場合、超えた分が払い戻される制度です。',
    aiSummary: {
      amount:
        '所得区分に応じた月額上限（例：住民税非課税世帯は月15,000円、一般所得者は44,400円）を超えた分が返金',
      targetPeople:
        '介護保険サービスを利用している方で、1ヶ月の自己負担合計が上限額を超えた方が対象になる可能性があります',
      deadline: '市区町村から申請書が届いた後、随時申請',
      requiredDocuments: ['高額介護サービス費支給申請書', '領収書'],
      applicationPlace: '住んでいる市区町村の介護保険担当窓口',
      notes: [
        '初回は市区町村から申請書が送付されることが多い（以降は自動的に支給）',
        '同一世帯内に複数の介護サービス利用者がいる場合は合算できる',
        '高額医療・高額介護合算療養費制度も別途あり',
      ],
      difficulty: 2,
      estimatedApplicationTime: '30〜60分（初回申請時）',
    },
    conditions: { ageMin: 65 },
    officialUrl:
      'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/kaigo_koureisha/index.html',
    lastUpdated: '2024-04-01',
  },
  {
    id: 'national-029',
    name: '介護保険負担限度額認定',
    providerLevel: 'national',
    providerName: '厚生労働省（市区町村）',
    category: 'elderly',
    tags: ['介護', '施設入所', '食費', '居住費', '軽減', '低所得'],
    shortDescription:
      '低所得の方が介護保険施設やショートステイを利用する際の食費・居住費を軽減する制度です。',
    aiSummary: {
      amount: '食費・居住費が大幅に軽減（例：第2段階の方は食費が通常費用の約3割程度に）',
      targetPeople:
        '住民税非課税世帯で介護保険施設（特養・老健等）やショートステイを利用している、または今後利用予定の方が対象になる可能性があります',
      deadline: '随時申請可（認定書は有効期間が1年、更新が必要）',
      requiredDocuments: [
        '負担限度額認定申請書',
        '金融機関の通帳の写し（預貯金残高確認のため）',
        '介護保険被保険者証',
        'マイナンバー確認書類',
      ],
      applicationPlace: '住んでいる市区町村の介護保険担当窓口',
      notes: [
        '1,000万円（配偶者がいる場合は2,000万円）以下の預貯金要件あり',
        '認定証を施設に提示することで軽減後の負担額になる',
        '非課税年金（遺族年金・障害年金）も収入として判定に含まれる',
      ],
      difficulty: 2,
      estimatedApplicationTime: '30〜60分',
    },
    conditions: { ageMin: 65 },
    officialUrl:
      'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/kaigo_koureisha/shisetsu/index.html',
    lastUpdated: '2024-04-01',
  },

  // ─── 生活・収入 ───────────────────────────────────────
  {
    id: 'national-009',
    name: '生活保護',
    providerLevel: 'national',
    providerName: '厚生労働省（福祉事務所）',
    category: 'income',
    tags: ['生活困窮', '最低限度', '現金給付', '医療扶助', '住宅扶助'],
    shortDescription:
      '生活に困窮するすべての方に対し、健康で文化的な最低限度の生活を保障する制度です。',
    aiSummary: {
      amount: '生活扶助・住宅扶助・医療扶助等（例：東京23区単身者で月約13万円程度）',
      targetPeople:
        '資産・能力等あらゆるものを活用してもなお生活費が最低生活費を下回る方が対象になる可能性があります',
      deadline: '随時申請可',
      requiredDocuments: [
        '申請書（窓口でもらえる）',
        '資産・収入の申告書',
        '通帳の写し',
        '健康保険証',
      ],
      applicationPlace: '住んでいる地域の福祉事務所（市役所・区役所内にある場合が多い）',
      notes: [
        '申請を窓口で断られることがあるが、申請権は法律で保障されている',
        '生活保護を受けながら求職活動も可能',
        'NPO等の支援団体に相談・同行してもらうことも可能',
      ],
      difficulty: 4,
      estimatedApplicationTime: '1〜2時間（面接調査含む）',
    },
    conditions: {},
    officialUrl:
      'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/seikatsuhogo/seikatuhogo/index.html',
    lastUpdated: '2024-01-01',
  },

  // ─── 住宅 ───────────────────────────────────────────
  {
    id: 'national-012',
    name: '住宅確保給付金',
    providerLevel: 'national',
    providerName: '厚生労働省（自立相談支援機関）',
    category: 'housing',
    tags: ['家賃', '住宅', '失業', '生活困窮', '給付金'],
    shortDescription:
      '離職や収入減少等により家賃の支払いが困難になった方に、一定期間家賃相当額を支給する制度です。',
    aiSummary: {
      amount: '地域の住宅扶助基準に準じる（例：東京都単身世帯で月額最大5.3万円）',
      targetPeople:
        '離職・廃業後2年以内または収入が一定以下で、家賃の支払いが困難な方が対象になる可能性があります',
      deadline: '原則3ヶ月支給（最大9ヶ月まで延長可）',
      requiredDocuments: [
        '申請書',
        '本人確認書類',
        '収入申告書',
        '賃貸借契約書',
        '通帳の写し',
      ],
      applicationPlace: '市区町村に設置された自立相談支援機関（生活困窮者支援窓口）',
      notes: [
        '求職活動が支給要件のひとつ',
        '収入・資産の要件あり',
        '給付金は大家へ直接支払われる（家賃以外には使えない）',
      ],
      difficulty: 3,
      estimatedApplicationTime: '1〜2時間（相談窓口訪問）',
    },
    conditions: { employmentTypes: ['unemployed'] },
    officialUrl: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000267520.html',
    lastUpdated: '2024-01-01',
  },

  // ─── 住宅（追加） ───────────────────────────────────────────
  {
    id: 'national-031',
    name: '住宅借入金等特別控除（住宅ローン控除）',
    providerLevel: 'national',
    providerName: '国税庁',
    category: 'housing',
    tags: ['住宅ローン', '税控除', '所得税', '住民税', '減税', 'マイホーム'],
    shortDescription:
      '住宅ローンを利用してマイホームを購入・新築・増改築した場合、年末ローン残高の0.7%が所得税から控除される制度です。',
    aiSummary: {
      amount: '年末ローン残高×0.7%（上限4,500万円残高ベース、最大31.5万円/年・最長13年間）',
      targetPeople:
        '住宅ローンを利用して新築・中古住宅を購入または増改築し入居した方が対象になる可能性があります（合計所得金額2,000万円以下）',
      deadline: '入居した翌年の確定申告（2年目以降は年末調整でも可）',
      requiredDocuments: [
        '確定申告書',
        '住宅借入金等特別控除額の計算明細書',
        '登記事項証明書（登記簿謄本）',
        '住宅ローンの年末残高等証明書',
        '売買契約書または建築請負契約書の写し',
      ],
      applicationPlace: '住所管轄の税務署（確定申告）または勤務先（2年目以降の年末調整）',
      notes: [
        '2022年以降は控除率が1%→0.7%に変更（省エネ住宅は借入上限額が引き上げ）',
        '控除期間は最長13年間（2022〜2025年入居分）',
        '合計所得金額が2,000万円を超える年は控除対象外',
      ],
      difficulty: 3,
      estimatedApplicationTime: '1〜3時間（初年度確定申告時）',
    },
    conditions: {},
    officialUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1213.htm',
    lastUpdated: '2024-01-01',
  },

  // ─── 年金・収入（追加） ───────────────────────────────────────────
  {
    id: 'national-032',
    name: '国民年金保険料の免除・猶予制度',
    providerLevel: 'national',
    providerName: '日本年金機構',
    category: 'income',
    tags: ['国民年金', '免除', '猶予', '低所得', '失業', '保険料'],
    shortDescription:
      '低所得・失業等により国民年金保険料の支払いが困難な方に、保険料を全額または一部免除・猶予する制度です。',
    aiSummary: {
      amount: '全額免除〜4分の1免除まで段階的に設定（免除中も受給資格期間に算入）',
      targetPeople:
        '前年所得が一定基準以下の方、または失業・天災等の特例により国民年金保険料の納付が困難な方が対象になる可能性があります',
      deadline: '随時申請可（申請月の2年前の月分まで遡って申請可）',
      requiredDocuments: [
        '国民年金保険料免除・納付猶予申請書',
        '失業の場合は雇用保険受給資格者証または離職票（写し）',
      ],
      applicationPlace: '住所管轄の市区町村の国民年金担当窓口または年金事務所',
      notes: [
        '全額免除の場合、将来の年金額は通常の半額程度（追納で満額に近づけられる）',
        '50歳未満は老齢基礎年金を除く「納付猶予制度」も選択可能',
        '申請は毎年度更新が必要（7月〜翌年6月分）',
      ],
      difficulty: 2,
      estimatedApplicationTime: '30〜60分',
    },
    conditions: { employmentTypes: ['unemployed', 'self_employed'] },
    officialUrl: 'https://www.nenkin.go.jp/service/kokunen/menjo/20150428.html',
    lastUpdated: '2024-01-01',
  },

  // ─── 医療（追加） ───────────────────────────────────────────
  {
    id: 'national-033',
    name: '医療費控除',
    providerLevel: 'national',
    providerName: '国税庁',
    category: 'medical',
    tags: ['医療費', '税控除', '確定申告', '所得控除', '歯科', '通院'],
    shortDescription:
      '1年間に支払った医療費が10万円（または所得の5%）を超えた場合、超えた分を所得から控除し税金が軽減される制度です。',
    aiSummary: {
      amount: '（医療費合計−10万円）×所得税率分が還付（所得200万円未満の場合は所得×5%超過分）',
      targetPeople:
        '1月〜12月の自己負担医療費が10万円を超えた方、または同一生計の家族の医療費合計が10万円を超えた方が対象になる可能性があります',
      deadline: '翌年2月16日〜3月15日の確定申告期間（5年間は遡って還付申告可能）',
      requiredDocuments: [
        '確定申告書',
        '医療費控除の明細書',
        '医療費の領収書（自宅で5年間保管が必要）',
      ],
      applicationPlace: '住所管轄の税務署（e-Taxによるオンライン申告も可）',
      notes: [
        '保険金等で補填された金額は差し引く必要がある',
        '市販薬は「セルフメディケーション税制」（12,000円超が対象）との選択適用',
        '歯の治療・妊娠出産費用・レーシック手術なども対象になる場合あり',
      ],
      difficulty: 2,
      estimatedApplicationTime: '1〜2時間（領収書整理含む）',
    },
    conditions: {},
    officialUrl: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1120.htm',
    lastUpdated: '2024-01-01',
  },

  // ─── 子育て（追加） ───────────────────────────────────────────
  {
    id: 'national-034',
    name: '不妊治療の保険適用制度',
    providerLevel: 'national',
    providerName: '厚生労働省',
    category: 'childcare',
    tags: ['不妊治療', '保険適用', '体外受精', '顕微授精', '人工授精'],
    shortDescription:
      '2022年4月より体外受精・顕微授精が健康保険の対象となり、治療費の自己負担が大幅に軽減されました。',
    aiSummary: {
      amount: '保険適用で自己負担3割（体外受精1回あたり自己負担9〜10万円程度）',
      targetPeople:
        '妊娠を望む夫婦（事実婚含む）で、医師に不妊治療が必要と判断された方が対象になる可能性があります（女性が43歳未満・通算回数制限あり）',
      deadline: '随時受診・申請可（保険適用は女性43歳未満、通算6回まで等の制限あり）',
      requiredDocuments: ['健康保険証', '医療機関への受診のみ（保険診療として算定）'],
      applicationPlace: '不妊治療を行う医療機関（事前に保険適用医療機関か確認を）',
      notes: [
        '保険適用外の「先進医療」と組み合わせる際は混合診療のルールに注意',
        '43歳以上は保険適用外だが都道府県独自の助成制度が利用できる場合あり',
        '男性不妊の手術も保険適用の対象',
      ],
      difficulty: 2,
      estimatedApplicationTime: '医療機関での通常受診手続きのみ',
    },
    conditions: { ageMax: 43 },
    officialUrl:
      'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kodomo/kodomo_kosodate/furyo/index.html',
    lastUpdated: '2024-04-01',
  },

  // ─── 生活・収入（追加） ───────────────────────────────────────────
  {
    id: 'national-035',
    name: '生活福祉資金貸付制度',
    providerLevel: 'national',
    providerName: '厚生労働省（社会福祉協議会）',
    category: 'income',
    tags: ['貸付', '低所得', '生活資金', '緊急小口資金', '福祉'],
    shortDescription:
      '低所得世帯・高齢者世帯・障害者世帯に対して、生活再建のための資金を低利息（または無利子）で貸し付ける制度です。',
    aiSummary: {
      amount: '総合支援資金：生活費月20万円以内（単身は月15万円以内）最長12ヶ月 等',
      targetPeople:
        '低所得世帯・高齢者世帯・障害者世帯で、一時的な資金が必要な方が対象になる可能性があります（収入・資産要件あり）',
      deadline: '随時申請可（市区町村社会福祉協議会に相談）',
      requiredDocuments: [
        '借入申込書',
        '収入の状況がわかる書類',
        '住民票',
        'マイナンバー確認書類',
      ],
      applicationPlace: '住んでいる市区町村の社会福祉協議会',
      notes: [
        '返済が必要な「貸付制度」であり、給付金ではない',
        '生活保護受給世帯は対象外',
        '自立相談支援機関の支援と合わせて活用されることが多い',
      ],
      difficulty: 3,
      estimatedApplicationTime: '1〜2時間（相談含む）',
    },
    conditions: {},
    officialUrl:
      'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/seikatsuhogo/seikatsu-kyufu/index.html',
    lastUpdated: '2024-01-01',
  },

  // ─── 雇用（追加） ───────────────────────────────────────────
  {
    id: 'national-036',
    name: 'ひとり親家庭高等技能訓練促進費等支援事業',
    providerLevel: 'national',
    providerName: '厚生労働省（市区町村）',
    category: 'employment',
    tags: ['ひとり親', '資格取得', '生活支援', '看護師', '介護福祉士', '月額支援'],
    shortDescription:
      'ひとり親家庭の親が2年以上の養成機関で看護師・介護福祉士等の資格取得を目指す間、生活費として月10万〜14万円を支給します。',
    aiSummary: {
      amount: '非課税世帯：月額14万1,000円、課税世帯：月額10万500円（訓練期間中）',
      targetPeople:
        '児童扶養手当を受給中（または同等の所得水準）のひとり親家庭の親で、看護師・介護福祉士等の資格取得のため2年以上の養成課程に在学している方が対象になる可能性があります',
      deadline: '訓練開始前に申請（市区町村への事前相談・申請が必要）',
      requiredDocuments: [
        '申請書',
        '在学証明書',
        '児童扶養手当証書（またはそれに相当する書類）',
        '戸籍謄本',
        '収入証明書類',
      ],
      applicationPlace: '住んでいる市区町村の担当窓口（福祉事務所等）',
      notes: [
        '看護師・准看護師・介護福祉士・保育士・理学療法士なども対象',
        '養成機関の最終年次には「修了一時金」12万500円（非課税世帯は16万3,200円）が支給',
        '教育訓練給付金（ハローワーク）との併用も可',
      ],
      difficulty: 3,
      estimatedApplicationTime: '1〜2時間（事前相談含む）',
    },
    conditions: { hasChildren: true, familyStructures: ['single_parent'] },
    officialUrl:
      'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kodomo/kodomo_kosodate/hitorioya/index.html',
    lastUpdated: '2024-04-01',
  },

  // ─── 教育（追加） ───────────────────────────────────────────
  {
    id: 'national-037',
    name: '高校生等奨学給付金',
    providerLevel: 'national',
    providerName: '文部科学省（都道府県）',
    category: 'education',
    tags: ['高校', '奨学金', '給付型', '返還不要', '低所得', '教育費'],
    shortDescription:
      '高校等に通う低所得世帯の生徒に対して、授業料以外の教育費（教科書代・通学費等）を支援する返還不要の給付金です。',
    aiSummary: {
      amount: '年額3万2,300円〜13万8,000円（学校種別・扶養人数・世帯状況により異なる）',
      targetPeople:
        '高等学校等に在籍する生徒の保護者で、生活保護世帯または住民税非課税世帯に該当する方が対象になる可能性があります',
      deadline: '在学する学校を通じて随時申請可',
      requiredDocuments: ['申請書（学校から配布）', '住民税非課税を証明する書類'],
      applicationPlace: '在籍している高等学校等',
      notes: [
        '高等学校等就学支援金（授業料無償化）とは別の制度で、授業料以外の経費をカバー',
        '私立高校・通信制高校の生徒も対象',
        '都道府県により給付額が若干異なる',
      ],
      difficulty: 1,
      estimatedApplicationTime: '30分以内（学校経由）',
    },
    conditions: { hasChildren: true },
    officialUrl: 'https://www.mext.go.jp/a_menu/shotou/mushouka/1342674.htm',
    lastUpdated: '2024-04-01',
  },

  // ─── 自営業・フリーランス ───────────────────────────────────────────
  {
    id: 'national-038',
    name: '小規模企業共済制度',
    providerLevel: 'national',
    providerName: '中小企業基盤整備機構',
    category: 'employment',
    tags: ['自営業', 'フリーランス', '退職金', '節税', '積立', '掛金控除'],
    shortDescription:
      '小規模企業の経営者・個人事業主が廃業・退職した際に退職金を受け取れる国の共済制度です。掛金が全額所得控除になります。',
    aiSummary: {
      amount: '掛金月額1,000〜70,000円（全額所得控除）、共済金は掛金総額×付加率（廃業時等に受取）',
      targetPeople:
        '常時使用する従業員が20人以下の小規模企業の役員・個人事業主・フリーランスが対象になる可能性があります',
      deadline: '随時加入可',
      requiredDocuments: [
        '加入申込書（金融機関または中小機構窓口でもらえる）',
        '確定申告書の写し（または開業届の写し等）',
      ],
      applicationPlace: '商工会議所・商工会または代理店となっている金融機関',
      notes: [
        '掛金が全額所得控除のため節税効果が高い（掛金70,000円/月で年間約84万円控除）',
        '廃業・引退時だけでなく、事業資金の低利融資制度も利用可能',
        '掛金は月1,000円〜70,000円の範囲で500円単位で変更可能',
      ],
      difficulty: 2,
      estimatedApplicationTime: '1〜2時間（書類準備含む）',
    },
    conditions: { employmentTypes: ['self_employed'] },
    officialUrl: 'https://www.smrj.go.jp/kyosai/skyosai/',
    lastUpdated: '2024-01-01',
  },
]
