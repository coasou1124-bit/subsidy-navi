import type { SubsidyCategory, ProviderLevel, EmploymentType, FamilyStructure } from '@/types/subsidy'

export const CATEGORY_LABELS: Record<SubsidyCategory, string> = {
  childcare: '子育て',
  housing: '住宅',
  employment: '就職・雇用',
  medical: '医療',
  elderly: '高齢者',
  disability: '障がい',
  income: '生活・収入',
  education: '教育',
  other: 'その他',
}

export const CATEGORY_COLORS: Record<SubsidyCategory, string> = {
  childcare: 'bg-pink-100 text-pink-700',
  housing: 'bg-blue-100 text-blue-700',
  employment: 'bg-green-100 text-green-700',
  medical: 'bg-red-100 text-red-700',
  elderly: 'bg-purple-100 text-purple-700',
  disability: 'bg-orange-100 text-orange-700',
  income: 'bg-yellow-100 text-yellow-700',
  education: 'bg-teal-100 text-teal-700',
  other: 'bg-gray-100 text-gray-700',
}

export const CATEGORY_ICONS: Record<SubsidyCategory, string> = {
  childcare: '👶',
  housing: '🏠',
  employment: '💼',
  medical: '🏥',
  elderly: '👴',
  disability: '♿',
  income: '💴',
  education: '📚',
  other: '📋',
}

export const PROVIDER_LABELS: Record<ProviderLevel, string> = {
  national: '国',
  prefectural: '都道府県',
  municipal: '市区町村',
}

export const PROVIDER_COLORS: Record<ProviderLevel, string> = {
  national: 'bg-blue-600 text-white',
  prefectural: 'bg-green-600 text-white',
  municipal: 'bg-purple-600 text-white',
}

export const EMPLOYMENT_LABELS: Record<EmploymentType, string> = {
  employed: '会社員・公務員',
  self_employed: '自営業・フリーランス',
  unemployed: '無職・求職中',
  student: '学生',
  retired: '退職・年金',
}

export const FAMILY_LABELS: Record<FamilyStructure, string> = {
  single: '一人暮らし',
  couple: '夫婦のみ',
  family: '夫婦＋子ども',
  single_parent: 'ひとり親',
  elderly_single: '高齢者一人暮らし',
  other: 'その他',
}

export const INCOME_RANGES = [
  { value: 'under200', label: '200万円未満' },
  { value: '200-400', label: '200〜400万円' },
  { value: '400-600', label: '400〜600万円' },
  { value: '600-800', label: '600〜800万円' },
  { value: 'over800', label: '800万円以上' },
]

export const PREFECTURES = [
  '北海道',
  '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
  '岐阜県', '静岡県', '愛知県', '三重県',
  '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
  '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県',
  '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
] as const

export type Prefecture = (typeof PREFECTURES)[number]

export const CONCERNS_OPTIONS: { value: SubsidyCategory; label: string; icon: string }[] = [
  { value: 'childcare', label: '子育て・育児', icon: '👶' },
  { value: 'housing', label: '住宅・家賃', icon: '🏠' },
  { value: 'employment', label: '就職・失業', icon: '💼' },
  { value: 'medical', label: '医療・病気', icon: '🏥' },
  { value: 'elderly', label: '高齢者・介護', icon: '👴' },
  { value: 'disability', label: '障がい', icon: '♿' },
  { value: 'income', label: '生活費・収入', icon: '💴' },
  { value: 'education', label: '教育・学費', icon: '📚' },
]
