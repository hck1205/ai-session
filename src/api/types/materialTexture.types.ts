export type MaterialTextureType =
  | 'BASECOLOR_MAP' | 'DIFFUSE_MAP' | 'SPECULAR_MAP' | 'NORMAL_MAP'
  | 'DISPLACEMENT_MAP' | 'TRANSPARENT_MAP' | 'EMISSION_MAP'
  | 'METALLIC_ROUGHNESS_MAP' | 'METALNESS_MAP'
  | 'SSS_COLOR1_MAP' | 'SSS_COLOR2_MAP' | 'SSS_COLOR3_MAP' | 'SSS_MIX_MAP'
  | 'DETAIL_NORMAL_MAP' | 'BLENDED_NORMAL_MAP' | 'AMBIENT_MAP'
  | 'REFLECTIVE_MAP' | 'REFRACT_MAP' | 'ALPHA_MAP'

export interface MaterialTexture {
  materialId: string
  textureType: MaterialTextureType
  filePath?: string
  fileName?: string
  angle?: number
  height?: number
  width?: number
  translationX?: number
  translationY?: number
}
