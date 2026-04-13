import type { PriceJson } from './common.types'

export interface Fabric {
  id: string
  name: string
  itemNo?: string
  construction?: string
  composition?: string
  thickness?: number
  width?: number
  cuttableWidth?: number
  supplier?: string
  owner?: string
  price?: PriceJson
  moq?: number
  country?: string
  weight?: number
  friction?: number
  frontMaterialId?: string
  backMaterialId?: string
  physicalTypeId?: string
  description?: string
  remark?: string
}

export type CreateFabricDto = Omit<Fabric, 'id'>
export type UpdateFabricDto = Partial<CreateFabricDto>
