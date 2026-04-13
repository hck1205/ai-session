import { createRepository } from './createRepository'
import { getDB } from './db'
import type {
  Season, Style, Article, ArticleBOM, Item,
  Fabric, Material, MaterialTexture, Trim, Button, ButtonHole,
  Zipper, Graphic, TopStitch, SubTopStitch, PhysicalPropertyType,
} from '../types'

export const seasonRepository = createRepository<Season>('seasons')
export const styleRepository = createRepository<Style>('styles')
export const articleRepository = createRepository<Article>('articles')
export const bomRepository = createRepository<ArticleBOM>('boms')
export const itemRepository = createRepository<Item>('items')
export const fabricRepository = createRepository<Fabric>('fabrics')
export const materialRepository = createRepository<Material>('materials')
export const trimRepository = createRepository<Trim>('trims')
export const buttonRepository = createRepository<Button>('buttons')
export const buttonHoleRepository = createRepository<ButtonHole>('buttonHoles')
export const zipperRepository = createRepository<Zipper>('zippers')
export const graphicRepository = createRepository<Graphic>('graphics')
export const topStitchRepository = createRepository<TopStitch>('topStitches')
export const subTopStitchRepository = createRepository<SubTopStitch>('subTopStitches')
export const physicalPropertyTypeRepository = createRepository<PhysicalPropertyType>('physicalPropertyTypes')

/** MaterialTexture 복합키 전용 repository */
export const materialTextureRepository = {
  getByMaterial: async (materialId: string): Promise<MaterialTexture[]> => {
    const db = await getDB()
    const all: MaterialTexture[] = await db.getAll('materialTextures')
    return all.filter((t) => t.materialId === materialId)
  },
  put: async (record: MaterialTexture): Promise<void> => {
    const db = await getDB()
    await db.put('materialTextures', record)
  },
  count: async (): Promise<number> => {
    const db = await getDB()
    return db.count('materialTextures')
  },
}
