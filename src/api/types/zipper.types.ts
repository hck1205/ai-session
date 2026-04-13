import type { PriceJson } from './common.types'

export interface Zipper {
  id: string
  name: string
  itemNo?: string
  materialType?: string
  function?: string
  stopperOption?: string
  gauge?: string
  teethWidth?: number
  weight?: number
  thickness?: number
  supplier?: string
  owner?: string
  price?: PriceJson
  moq?: number
  pullerMaterialId?: string
  sliderMaterialId?: string
  teethMaterialId?: string
  tapeFrontMaterialId?: string
  description?: string
  remark?: string
}

export type CreateZipperDto = Omit<Zipper, 'id'>
export type UpdateZipperDto = Partial<CreateZipperDto>
