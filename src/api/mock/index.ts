import {
  seasonRepository, styleRepository, articleRepository, bomRepository, itemRepository,
  fabricRepository, materialRepository, trimRepository, buttonRepository,
  buttonHoleRepository, zipperRepository, graphicRepository, topStitchRepository,
  physicalPropertyTypeRepository,
} from '../repositories'
import type {
  Article,
  ArticleBOM,
  Button,
  Fabric,
  Graphic,
  Item,
  Material,
  Season,
  Style,
  Trim,
  Zipper,
} from '../types'
import { seasonSeeds } from './seed/season.seed'
import { styleSeeds } from './seed/style.seed'
import { articleSeeds } from './seed/article.seed'
import { materialSeeds } from './seed/material.seed'
import { fabricSeeds } from './seed/fabric.seed'
import { trimSeeds } from './seed/trim.seed'
import { buttonSeeds } from './seed/button.seed'
import { zipperSeeds } from './seed/zipper.seed'
import { graphicSeeds } from './seed/graphic.seed'
import { itemSeeds } from './seed/item.seed'
import { bomSeeds } from './seed/bom.seed'

export const IS_MOCK = import.meta.env.VITE_MOCK === 'true'
const SEED_VARIANTS = 12

const SEASON_VARIANTS = ['Core', 'Studio', 'Capsule', 'Runway', 'Holiday', 'Archive', 'Resort', 'Transit', 'Mono', 'Utility', 'Weekend']
const STYLE_VARIANTS = ['Refined', 'Utility', 'Minimal', 'Studio', 'Field', 'Core', 'Transit', 'Edition', 'Signature', 'Atelier', 'Weekend']
const ITEM_VARIANTS = ['Amber', 'Slate', 'Moss', 'Stone', 'Ink', 'Clay', 'Mist', 'Navy', 'Cinder', 'Cobalt', 'Sand']
const SUPPLIER_VARIANTS = ['Seoul Mill', 'Milan Source', 'Osaka Trim', 'Portland Lab', 'Tokyo Studio', 'Barcelona Works', 'Busan Textile', 'LA Atelier', 'Taipei Maker', 'Berlin Source', 'London House']
const COLOR_VARIANTS = [
  { name: 'Smoke Blue', code: '#60728A' },
  { name: 'Clay Beige', code: '#B8926A' },
  { name: 'Forest Moss', code: '#536B4D' },
  { name: 'Rust Ember', code: '#A45733' },
  { name: 'Sandstone', code: '#C8B18A' },
  { name: 'Graphite', code: '#3A3F4B' },
  { name: 'Dune', code: '#C5A977' },
  { name: 'Evergreen', code: '#2F5D50' },
  { name: 'Mulberry', code: '#6C3B59' },
  { name: 'Lagoon', code: '#2A6F97' },
  { name: 'Saffron', code: '#C98A2E' },
]

const variantLabel = (index: number, labels: string[]) => labels[(index - 1) % labels.length]
const variantSuffix = (index: number) => `Edition ${String(index + 1).padStart(2, '0')}`
const variantId = (id: string, index: number) => (index === 0 ? id : `${id}-v${index + 1}`)
const variantCode = (code: string, index: number) => (index === 0 ? code : `${code}-${String(index + 1).padStart(2, '0')}`)
const withVariantName = (name: string, index: number, labels: string[]) =>
  index === 0 ? name : `${variantLabel(index, labels)} ${name}`
const shiftRgb = (rgb: [number, number, number] | undefined, index: number): [number, number, number] | undefined =>
  rgb
    ? rgb.map((value, channel) => Math.max(0, Math.min(255, value + ((index * 17 + channel * 11) % 41) - 20))) as [number, number, number]
    : undefined

const expandSeasons = (base: Season[]): Season[] =>
  Array.from({ length: SEED_VARIANTS }, (_, index) =>
    base.map((season, seasonIndex) => ({
      ...season,
      id: variantId(season.id, index),
      seasonCode: variantCode(season.seasonCode, index),
      seasonName: index === 0 ? season.seasonName : `${season.seasonName} ${variantLabel(index + seasonIndex, SEASON_VARIANTS)}`,
      season: index === 0 ? season.season : `${season.season} ${variantSuffix(index)}`,
      seasonStatus: index > 7 ? 'archived' : season.seasonStatus,
    }))
  ).flat()

const expandStyles = (base: Style[]): Style[] =>
  Array.from({ length: SEED_VARIANTS }, (_, index) =>
    base.map((style, styleIndex) => ({
      ...style,
      id: variantId(style.id, index),
      styleCode: variantCode(style.styleCode, index),
      styleName: withVariantName(style.styleName, index + styleIndex, STYLE_VARIANTS),
      seasonId: variantId(style.seasonId, index),
    }))
  ).flat()

const expandArticles = (base: Article[]): Article[] =>
  Array.from({ length: SEED_VARIANTS }, (_, index) =>
    base.map((article, articleIndex) => {
      const palette = COLOR_VARIANTS[(index + articleIndex) % COLOR_VARIANTS.length]
      return {
        ...article,
        id: variantId(article.id, index),
        styleId: variantId(article.styleId, index),
        articleCode: variantCode(article.articleCode, index),
        colorName: index === 0 ? article.colorName : palette.name,
        colorCode: index === 0 ? article.colorCode : palette.code,
      }
    })
  ).flat()

const expandFabrics = (base: Fabric[]): Fabric[] =>
  Array.from({ length: SEED_VARIANTS }, (_, index) =>
    base.map((fabric, fabricIndex) => ({
      ...fabric,
      id: variantId(fabric.id, index),
      itemNo: fabric.itemNo ? variantCode(fabric.itemNo, index) : undefined,
      name: withVariantName(fabric.name, index + fabricIndex, ITEM_VARIANTS),
      supplier: index === 0 ? fabric.supplier : SUPPLIER_VARIANTS[(index + fabricIndex) % SUPPLIER_VARIANTS.length],
      thickness: fabric.thickness !== undefined ? Number((fabric.thickness + index * 0.08).toFixed(2)) : undefined,
      width: fabric.width !== undefined ? fabric.width + index * 2 : undefined,
      cuttableWidth: fabric.cuttableWidth !== undefined ? fabric.cuttableWidth + index * 2 : undefined,
      weight: fabric.weight !== undefined ? fabric.weight + index * 5 : undefined,
      moq: fabric.moq !== undefined ? fabric.moq + index * 10 : undefined,
      description: fabric.description ?? (index > 0 ? `${variantLabel(index, ITEM_VARIANTS)} variant for broader library coverage.` : undefined),
    }))
  ).flat()

const expandTrims = (base: Trim[]): Trim[] =>
  Array.from({ length: SEED_VARIANTS }, (_, index) =>
    base.map((trim, trimIndex) => ({
      ...trim,
      id: variantId(trim.id, index),
      itemNo: trim.itemNo ? variantCode(trim.itemNo, index) : undefined,
      name: withVariantName(trim.name, index + trimIndex, ITEM_VARIANTS),
      supplier: index === 0 ? trim.supplier : SUPPLIER_VARIANTS[(index + trimIndex) % SUPPLIER_VARIANTS.length],
      weight: trim.weight !== undefined ? Number((trim.weight + index * 0.15).toFixed(2)) : undefined,
      moq: trim.moq !== undefined ? trim.moq + index * 5 : undefined,
    }))
  ).flat()

const expandButtons = (base: Button[]): Button[] =>
  Array.from({ length: SEED_VARIANTS }, (_, index) =>
    base.map((button, buttonIndex) => ({
      ...button,
      id: variantId(button.id, index),
      itemNo: button.itemNo ? variantCode(button.itemNo, index) : undefined,
      name: withVariantName(button.name, index + buttonIndex, ITEM_VARIANTS),
      supplier: index === 0 ? button.supplier : SUPPLIER_VARIANTS[(index + buttonIndex) % SUPPLIER_VARIANTS.length],
      thickness: button.thickness !== undefined ? Number((button.thickness + index * 0.05).toFixed(2)) : undefined,
      width: button.width !== undefined ? Number((button.width + index * 0.4).toFixed(2)) : undefined,
      weight: button.weight !== undefined ? Number((button.weight + index * 0.03).toFixed(2)) : undefined,
    }))
  ).flat()

const expandZippers = (base: Zipper[]): Zipper[] =>
  Array.from({ length: SEED_VARIANTS }, (_, index) =>
    base.map((zipper, zipperIndex) => ({
      ...zipper,
      id: variantId(zipper.id, index),
      itemNo: zipper.itemNo ? variantCode(zipper.itemNo, index) : undefined,
      name: withVariantName(zipper.name, index + zipperIndex, ITEM_VARIANTS),
      supplier: index === 0 ? zipper.supplier : SUPPLIER_VARIANTS[(index + zipperIndex) % SUPPLIER_VARIANTS.length],
      teethWidth: zipper.teethWidth !== undefined ? Number((zipper.teethWidth + index * 0.2).toFixed(2)) : undefined,
      thickness: zipper.thickness !== undefined ? Number((zipper.thickness + index * 0.04).toFixed(2)) : undefined,
      weight: zipper.weight !== undefined ? Number((zipper.weight + index * 0.08).toFixed(2)) : undefined,
    }))
  ).flat()

const expandGraphics = (base: Graphic[]): Graphic[] =>
  Array.from({ length: SEED_VARIANTS }, (_, index) =>
    base.map((graphic, graphicIndex) => ({
      ...graphic,
      id: variantId(graphic.id, index),
      itemNo: graphic.itemNo ? variantCode(graphic.itemNo, index) : undefined,
      name: withVariantName(graphic.name, index + graphicIndex, ITEM_VARIANTS),
      supplier: index === 0 ? graphic.supplier : SUPPLIER_VARIANTS[(index + graphicIndex) % SUPPLIER_VARIANTS.length],
      width: graphic.width !== undefined ? graphic.width + index * 3 : undefined,
      height: graphic.height !== undefined ? graphic.height + index * 2 : undefined,
    }))
  ).flat()

const expandMaterials = (base: Material[]): Material[] =>
  Array.from({ length: SEED_VARIANTS }, (_, index) =>
    base.map((material, materialIndex) => ({
      ...material,
      id: variantId(material.id, index),
      target: index === 0 ? material.target : `${material.target ?? 'Apparel'} ${variantLabel(index + materialIndex, ITEM_VARIANTS)}`,
      baseColor: shiftRgb(material.baseColor, index),
      baseColorName: index === 0 ? material.baseColorName : `${variantLabel(index + materialIndex, ITEM_VARIANTS)} ${material.baseColorName ?? 'Tone'}`,
      roughness: material.roughness !== undefined ? Math.min(100, material.roughness + index * 2) : undefined,
      metalness: material.metalness !== undefined ? Math.min(100, material.metalness + index) : undefined,
      opacity: material.opacity !== undefined ? Math.max(0, Math.min(100, material.opacity - index)) : undefined,
      reflectionIntensity: material.reflectionIntensity !== undefined ? Math.min(100, material.reflectionIntensity + index) : undefined,
    }))
  ).flat()

const expandItems = (base: Item[]): Item[] =>
  Array.from({ length: SEED_VARIANTS }, (_, index) =>
    base.map((item, itemIndex) => ({
      ...item,
      id: variantId(item.id, index),
      itemCode: variantCode(item.itemCode, index),
      name: withVariantName(item.name, index + itemIndex, ITEM_VARIANTS),
      price: Number((item.price * (1 + index * 0.035)).toFixed(2)),
      detailId: variantId(item.detailId, index),
    }))
  ).flat()

const expandBOMs = (base: ArticleBOM[]): ArticleBOM[] =>
  Array.from({ length: SEED_VARIANTS }, (_, index) =>
    base.map((bom, bomIndex) => ({
      ...bom,
      id: variantId(bom.id, index),
      articleId: variantId(bom.articleId, index),
      itemId: variantId(bom.itemId, index),
      consumption: Number((bom.consumption * (1 + (((index + bomIndex) % 4) * 0.04))).toFixed(2)),
    }))
  ).flat()

const expandedSeasonSeeds = expandSeasons(seasonSeeds)
const expandedStyleSeeds = expandStyles(styleSeeds)
const expandedArticleSeeds = expandArticles(articleSeeds)
const expandedMaterialSeeds = expandMaterials(materialSeeds)
const expandedFabricSeeds = expandFabrics(fabricSeeds)
const expandedTrimSeeds = expandTrims(trimSeeds)
const expandedButtonSeeds = expandButtons(buttonSeeds)
const expandedZipperSeeds = expandZippers(zipperSeeds)
const expandedGraphicSeeds = expandGraphics(graphicSeeds)
const expandedItemSeeds = expandItems(itemSeeds)
const expandedBOMSeeds = expandBOMs(bomSeeds)

interface SeedableRepository<T> {
  count: () => Promise<number>
  bulkPut: (records: T[]) => Promise<void>
}

/**
 * IndexedDB가 비어있을 때만 seed 데이터를 적재한다.
 * 앱 초기화 시 한 번만 호출한다.
 */
export const initializeMockDB = async (): Promise<void> => {
  if (!IS_MOCK) return

  const seedMap: Array<{ repo: SeedableRepository<any>; seeds: any[] }> = [
    { repo: seasonRepository,          seeds: expandedSeasonSeeds },
    { repo: styleRepository,           seeds: expandedStyleSeeds },
    { repo: articleRepository,         seeds: expandedArticleSeeds },
    { repo: materialRepository,        seeds: expandedMaterialSeeds },
    { repo: fabricRepository,          seeds: expandedFabricSeeds },
    { repo: trimRepository,            seeds: expandedTrimSeeds },
    { repo: buttonRepository,          seeds: expandedButtonSeeds },
    { repo: buttonHoleRepository,      seeds: [] },
    { repo: zipperRepository,          seeds: expandedZipperSeeds },
    { repo: graphicRepository,         seeds: expandedGraphicSeeds },
    { repo: itemRepository,            seeds: expandedItemSeeds },
    { repo: bomRepository,             seeds: expandedBOMSeeds },
    { repo: topStitchRepository,       seeds: [] },
    { repo: physicalPropertyTypeRepository, seeds: [] },
  ]

  await Promise.all(
    seedMap.map(async ({ repo, seeds }) => {
      const count = await repo.count()
      if (count < seeds.length) {
        await repo.bulkPut(seeds)
      }
    })
  )
}
