import { createService } from './createService'
import {
  seasonRepository, styleRepository, articleRepository, bomRepository, itemRepository,
  fabricRepository, materialRepository, trimRepository, buttonRepository,
  buttonHoleRepository, zipperRepository, graphicRepository, topStitchRepository,
  physicalPropertyTypeRepository,
} from '../repositories'
import type {
  Season, Style, Article, ArticleBOM, CreateArticleBOMDto, UpdateArticleBOMDto,
  Item, CreateItemDto, UpdateItemDto,
  Fabric, CreateFabricDto, UpdateFabricDto,
  Material, CreateMaterialDto, UpdateMaterialDto,
  Trim, CreateTrimDto, UpdateTrimDto,
  Button, CreateButtonDto, UpdateButtonDto,
  ButtonHole, CreateButtonHoleDto,
  Zipper, CreateZipperDto, UpdateZipperDto,
  Graphic, CreateGraphicDto, UpdateGraphicDto,
  TopStitch, CreateTopStitchDto,
  PhysicalPropertyType,
} from '../types'

export const seasonService      = createService<Season,              Partial<Season>,      Partial<Season>>     ('/seasons',                  seasonRepository)
export const styleService       = createService<Style,               Partial<Style>,       Partial<Style>>      ('/styles',                   styleRepository)
export const articleService     = createService<Article,             Partial<Article>,     Partial<Article>>    ('/articles',                 articleRepository)
export const bomService         = createService<ArticleBOM,          CreateArticleBOMDto,  UpdateArticleBOMDto> ('/boms',                     bomRepository)
export const itemService        = createService<Item,                CreateItemDto,        UpdateItemDto>       ('/items',                    itemRepository)
export const fabricService      = createService<Fabric,              CreateFabricDto,      UpdateFabricDto>     ('/fabrics',                  fabricRepository)
export const materialService    = createService<Material,            CreateMaterialDto,    UpdateMaterialDto>   ('/materials',                materialRepository)
export const trimService        = createService<Trim,                CreateTrimDto,        UpdateTrimDto>       ('/trims',                    trimRepository)
export const buttonService      = createService<Button,              CreateButtonDto,      UpdateButtonDto>     ('/buttons',                  buttonRepository)
export const buttonHoleService  = createService<ButtonHole,          CreateButtonHoleDto,  Partial<ButtonHole>> ('/button-holes',             buttonHoleRepository)
export const zipperService      = createService<Zipper,              CreateZipperDto,      UpdateZipperDto>     ('/zippers',                  zipperRepository)
export const graphicService     = createService<Graphic,             CreateGraphicDto,     UpdateGraphicDto>    ('/graphics',                 graphicRepository)
export const topStitchService   = createService<TopStitch,           CreateTopStitchDto,   Partial<TopStitch>>  ('/top-stitches',             topStitchRepository)
export const physicalPropertyTypeService = createService<PhysicalPropertyType, Partial<PhysicalPropertyType>, Partial<PhysicalPropertyType>>('/physical-property-types', physicalPropertyTypeRepository)

/** BOM 조회 — articleId로 필터링 (mock에서는 클라이언트 필터) */
export const getBOMsByArticle = async (articleId: string): Promise<ArticleBOM[]> => {
  const all = await bomService.getAll()
  return all.filter((b) => b.articleId === articleId)
}
