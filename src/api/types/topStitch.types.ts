import type { PriceJson } from './common.types'

export interface TopStitch {
  id: string
  name: string
  itemNo?: string
  shape?: string
  material?: string
  length?: number
  offset?: number
  supplier?: string
  owner?: string
  price?: PriceJson
  moq?: number
  description?: string
  remark?: string
}

export interface SubTopStitch {
  id: string
  topStitchId: string
  shape?: string
  length?: number
  width?: number
  space?: number
  threadThickness?: number
  threadThicknessUnit?: string
  face?: string
  numberOfLines?: number
  materialId?: string
}

export type CreateTopStitchDto = Omit<TopStitch, 'id'>
