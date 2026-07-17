export type ProviderLevel = 'national' | 'prefectural' | 'municipal'

export type SubsidyCategory =
  | 'childcare'
  | 'housing'
  | 'employment'
  | 'medical'
  | 'elderly'
  | 'disability'
  | 'income'
  | 'education'
  | 'other'

export type EmploymentType =
  | 'employed'
  | 'self_employed'
  | 'unemployed'
  | 'student'
  | 'retired'

export type FamilyStructure =
  | 'single'
  | 'couple'
  | 'family'
  | 'single_parent'
  | 'elderly_single'
  | 'other'

export interface AISummary {
  amount: string
  targetPeople: string
  deadline: string
  requiredDocuments: string[]
  applicationPlace: string
  notes: string[]
  difficulty: number
  estimatedApplicationTime: string
  deadlineDate?: string
}

export interface SubsidyConditions {
  ageMin?: number
  ageMax?: number
  familyStructures?: FamilyStructure[]
  employmentTypes?: EmploymentType[]
  prefectures?: string[]
  cities?: string[]
  hasChildren?: boolean
  maxIncomeLabelRange?: string
}

export interface Subsidy {
  id: string
  name: string
  providerLevel: ProviderLevel
  providerName: string
  prefecture?: string
  city?: string
  category: SubsidyCategory
  tags: string[]
  shortDescription: string
  aiSummary: AISummary
  conditions: SubsidyConditions
  officialUrl: string
  lastUpdated: string
}

export interface UserProfile {
  age: number
  prefecture: string
  city: string
  familyStructure: FamilyStructure
  hasChildren: boolean
  childrenCount: number
  employment: EmploymentType
  incomeRange: string
  concerns: SubsidyCategory[]
}

export interface SearchResult {
  subsidy: Subsidy
  score: number
  matchReasons: string[]
}
