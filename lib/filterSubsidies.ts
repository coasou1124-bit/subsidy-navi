import type {
  Subsidy,
  UserProfile,
  SearchResult,
  SubsidyCategory,
  FamilyStructure,
  EmploymentType,
} from '@/types/subsidy'

const EMPLOYMENT_LABELS: Record<EmploymentType, string> = {
  employed: '会社員・公務員',
  self_employed: '自営業・フリーランス',
  unemployed: '求職中',
  student: '学生',
  retired: '退職済み',
}

const FAMILY_LABELS: Record<FamilyStructure, string> = {
  single: '一人暮らし',
  couple: '夫婦のみ',
  family: '子育て世帯',
  single_parent: 'ひとり親',
  elderly_single: '高齢者世帯',
  other: '',
}

export function filterSubsidies(profile: UserProfile, subsidies: Subsidy[]): SearchResult[] {
  const results: SearchResult[] = []

  for (const subsidy of subsidies) {
    const { score, excluded } = scoreSubsidy(profile, subsidy)
    if (!excluded && score > 0) {
      results.push({
        subsidy,
        score,
        matchReasons: [generatePersonalizedReason(profile, subsidy)],
      })
    }
  }

  return results.sort((a, b) => b.score - a.score)
}

function generatePersonalizedReason(profile: UserProfile, subsidy: Subsidy): string {
  const employLabel = EMPLOYMENT_LABELS[profile.employment]
  const familyLabel = FAMILY_LABELS[profile.familyStructure]

  const profileParts: string[] = [`${profile.age}歳`, employLabel]
  if (familyLabel) profileParts.push(familyLabel)

  const profileIntro = `あなたは${profileParts.join('・')}`
  const connection = buildConnectionReason(profile, subsidy)

  return `${profileIntro}で、${connection}${subsidy.name}の対象になる可能性があります。`
}

function buildConnectionReason(profile: UserProfile, subsidy: Subsidy): string {
  const { category, conditions: c } = subsidy

  if (profile.familyStructure === 'single_parent' && category === 'childcare') {
    return 'ひとり親世帯を対象とした支援制度があり、'
  }

  if (profile.employment === 'unemployed') {
    if (category === 'employment') {
      return '失業・求職中の方を対象とした制度のため、条件を満たせば'
    }
    if (category === 'income') {
      return '収入が減少した方への生活支援制度のため、'
    }
    if (category === 'housing') {
      return '求職中の方向けの住居支援制度のため、'
    }
  }

  if (category === 'childcare') {
    if (profile.hasChildren) {
      return 'お子さんを養育しているご家庭を対象とした制度のため、'
    }
    return '出産・育児に関わる方向けの制度のため、状況によっては'
  }

  if (category === 'education') {
    if (profile.hasChildren) {
      return 'お子さんの教育費支援を目的とした制度のため、'
    }
    return '学び直し・スキルアップを目的とした制度のため、'
  }

  if (category === 'elderly') {
    if (profile.age >= 65) {
      return `${profile.age}歳の方を対象とした制度があり、`
    }
    return '介護が必要な家族がいる方も含む制度のため、'
  }

  if (c.ageMin !== undefined && c.ageMax !== undefined) {
    return `${c.ageMin}〜${c.ageMax}歳の方を対象とした制度のため、`
  }
  if (c.ageMin !== undefined) {
    return `${c.ageMin}歳以上の方を対象とした制度のため、`
  }

  const categoryReasons: Record<SubsidyCategory, string> = {
    childcare: '子育て支援を目的とした制度のため、状況によっては',
    housing: '住宅取得・家賃支援を目的とした制度のため、条件を満たせば',
    employment: '就職・雇用支援を目的とした制度のため、',
    medical: '医療費の負担を軽減する制度のため、医療費が発生した場合に',
    elderly: '高齢者・介護支援を目的とした制度のため、',
    disability: '障がいのある方を対象とした制度のため、条件によっては',
    income: '生活費の支援を目的とした制度のため、収入条件を満たせば',
    education: '教育・学習支援を目的とした制度のため、',
    other: 'ご状況に関連する可能性のある制度のため、',
  }

  return categoryReasons[category] ?? 'ご状況に関連する可能性のある制度のため、'
}

export function getMissedSubsidies(
  profile: UserProfile,
  topResults: SearchResult[],
  allSubsidies: Subsidy[],
): { subsidy: Subsidy; reason: string }[] {
  const topIds = new Set(topResults.map((r) => r.subsidy.id))
  const topCategories = new Set(topResults.map((r) => r.subsidy.category))

  const suggestions: { subsidy: Subsidy; reason: string; priority: number }[] = []

  for (const subsidy of allSubsidies) {
    if (topIds.has(subsidy.id)) continue

    const { excluded } = scoreSubsidy(profile, subsidy)
    if (excluded) continue

    let reason = ''
    let priority = 0

    if (subsidy.category === 'medical' && !topCategories.has('medical')) {
      reason = '医療費が高額になった月に還付・支援を受けられます'
      priority = 4
    } else if (subsidy.category === 'housing' && !topCategories.has('housing')) {
      reason = '家賃や住居費の支援として利用できる場合があります'
      priority = 3
    } else if (subsidy.category === 'income' && !topCategories.has('income')) {
      reason = '生活費を補う給付・支援として活用できます'
      priority = 3
    } else if (
      subsidy.category === 'education' &&
      profile.hasChildren &&
      !topCategories.has('education')
    ) {
      reason = 'お子さんの教育費の支援に使える制度です'
      priority = 3
    } else if (subsidy.category === 'employment' && !topCategories.has('employment')) {
      reason = '就職・転職活動中に受けられる可能性があります'
      priority = 2
    } else if (subsidy.category === 'elderly' && profile.age >= 55 && !topCategories.has('elderly')) {
      reason = '今後に備えて知っておくと役立つ制度です'
      priority = 2
    } else if (subsidy.category === 'disability') {
      reason = '条件によっては対象になる場合があります'
      priority = 1
    }

    if (reason) {
      suggestions.push({ subsidy, reason, priority })
    }
  }

  return suggestions
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 5)
    .map(({ subsidy, reason }) => ({ subsidy, reason }))
}

function scoreSubsidy(
  profile: UserProfile,
  subsidy: Subsidy,
): { score: number; excluded: boolean } {
  let score = 0
  const c = subsidy.conditions

  if (c.ageMin !== undefined && profile.age < c.ageMin) {
    return { score: 0, excluded: true }
  }
  if (c.ageMax !== undefined && profile.age > c.ageMax) {
    return { score: 0, excluded: true }
  }
  if (c.hasChildren === true && !profile.hasChildren) {
    return { score: 0, excluded: true }
  }
  if (c.familyStructures && c.familyStructures.length > 0) {
    if (!c.familyStructures.includes(profile.familyStructure)) {
      return { score: 0, excluded: true }
    }
  }
  if (c.employmentTypes && c.employmentTypes.length > 0) {
    if (!c.employmentTypes.includes(profile.employment)) {
      return { score: 0, excluded: true }
    }
  }

  if (subsidy.providerLevel === 'national') {
    score += 5
  } else if (subsidy.providerLevel === 'prefectural') {
    if (subsidy.prefecture === profile.prefecture) {
      score += 15
    } else {
      return { score: 0, excluded: true }
    }
  } else if (subsidy.providerLevel === 'municipal') {
    if (subsidy.city === profile.city) {
      score += 25
    } else {
      return { score: 0, excluded: true }
    }
  }

  if (profile.concerns.length > 0 && profile.concerns.includes(subsidy.category)) {
    score += 50
  } else if (profile.concerns.length === 0) {
    score += 20
  }

  if (profile.hasChildren && ['childcare', 'education'].includes(subsidy.category)) {
    score += 25
  }

  if (profile.age >= 65 && subsidy.category === 'elderly') {
    score += 30
  }

  if (
    profile.employment === 'unemployed' &&
    ['employment', 'housing', 'income'].includes(subsidy.category)
  ) {
    score += 25
  }

  if (profile.familyStructure === 'single_parent' && subsidy.category === 'childcare') {
    score += 20
  }

  if (
    profile.incomeRange === 'under200' &&
    ['income', 'housing', 'medical'].includes(subsidy.category)
  ) {
    score += 15
  }

  if (subsidy.category === 'medical') {
    score += 10
  }

  return { score, excluded: false }
}
