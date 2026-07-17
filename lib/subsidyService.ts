import type { Subsidy } from '@/types/subsidy'
import { getAllSubsidies, getSubsidyById as getById } from '@/data/index'

// Abstracts the data layer — swap out static data for API calls here later.

export async function fetchAllSubsidies(): Promise<Subsidy[]> {
  return getAllSubsidies()
}

export async function fetchSubsidyById(id: string): Promise<Subsidy | null> {
  return getById(id) ?? null
}
