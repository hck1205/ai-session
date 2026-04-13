export type MaterialSourceType = 'PBR' | 'Substance'
export type MaterialShadingType =
  | 'Fabric_Matte' | 'Fabric_Shiny' | 'Fabric_Silk/Satin' | 'Fabric_Velvet'
  | 'Denim' | 'Leather' | 'Knitwear' | 'Plastic' | 'Metal' | 'Fur'
  | 'Gem' | 'Glass' | 'Glitter' | 'Iridescence' | 'Light' | 'Skin'
export type MaterialTextureMapping = 'Repeat' | 'Unified'

export interface Material {
  id: string
  sourceType?: MaterialSourceType
  textureMapping?: MaterialTextureMapping
  shadingType?: MaterialShadingType
  target?: string
  baseColor?: [number, number, number]
  baseColorName?: string
  desaturated?: boolean
  shadowGray?: number
  shadowIntensity?: number
  opacity?: number
  reflectionIntensity?: number
  roughness?: number
  metalness?: number
}

export type CreateMaterialDto = Omit<Material, 'id'>
export type UpdateMaterialDto = Partial<CreateMaterialDto>
