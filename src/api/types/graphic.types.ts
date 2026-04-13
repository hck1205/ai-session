import type { PriceJson } from './common.types'

export interface Graphic {
  id: string
  name: string
  itemNo?: string
  height?: number
  width?: number
  supplier?: string
  owner?: string
  price?: PriceJson
  moq?: number
  materialId?: string
  description?: string
  remark?: string
}

export type CreateGraphicDto = Omit<Graphic, 'id'>
export type UpdateGraphicDto = Partial<CreateGraphicDto>
