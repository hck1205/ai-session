import type { PriceJson } from './common.types'

export interface ButtonHole {
  id: string
  name: string
  itemNo?: string
  width?: number
  supplier?: string
  owner?: string
  price?: PriceJson
  moq?: number
  materialId?: string
  description?: string
  remark?: string
}

export type CreateButtonHoleDto = Omit<ButtonHole, 'id'>
