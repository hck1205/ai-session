import type { PriceJson } from './common.types'

export interface Trim {
  id: string
  name: string
  itemNo?: string
  classification?: string
  weight?: number
  supplier?: string
  owner?: string
  price?: PriceJson
  moq?: number
  materialId?: string
  description?: string
  remark?: string
}

export type CreateTrimDto = Omit<Trim, 'id'>
export type UpdateTrimDto = Partial<CreateTrimDto>
