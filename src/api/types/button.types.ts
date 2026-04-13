import type { PriceJson } from './common.types'

export interface Button {
  id: string
  name: string
  itemNo?: string
  thickness?: number
  width?: number
  weight?: number
  supplier?: string
  owner?: string
  price?: PriceJson
  moq?: number
  bodyMaterialId?: string
  description?: string
  remark?: string
}

export type CreateButtonDto = Omit<Button, 'id'>
export type UpdateButtonDto = Partial<CreateButtonDto>
