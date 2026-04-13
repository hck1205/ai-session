export type ItemType = 'Fabric' | 'Graphic' | 'Button' | 'ButtonHole' | 'Trim' | 'Zipper' | 'TopStitch'

export interface Item {
  id: string
  itemCode: string
  itemType: ItemType
  name: string
  price: number
  priceUnit: string
  supplierId?: string
  detailId: string
}

export interface CreateItemDto {
  itemCode: string
  itemType: ItemType
  name: string
  price: number
  priceUnit: string
  supplierId?: string
  detailId: string
}

export interface UpdateItemDto {
  name?: string
  price?: number
  priceUnit?: string
}
