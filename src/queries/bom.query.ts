import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { bomService, getBOMsByArticle, itemService } from '../api/services'
import type { CreateArticleBOMDto, UpdateArticleBOMDto, ArticleBOM, Item } from '../api/types'

export const bomKeys = {
  all:         () => ['boms'] as const,
  byArticle:   (articleId: string) => [...bomKeys.all(), 'article', articleId] as const,
  withItems:   (articleId: string) => [...bomKeys.all(), 'withItems', articleId] as const,
}

export interface BOMRowWithItem extends ArticleBOM {
  item: Item
  rowCost: number
}

export interface ArticleCostSummary {
  rows: BOMRowWithItem[]
  totalCost: number
}

/**
 * Article BOM과 각 Item 단가를 조합해 원가를 계산한다.
 * row_cost = item.price × bom.consumption
 * article_total_cost = sum(row_cost)
 */
const fetchBOMWithCost = async (articleId: string): Promise<ArticleCostSummary> => {
  const boms = await getBOMsByArticle(articleId)
  const items = await Promise.all(boms.map((b) => itemService.getById(b.itemId)))
  const rows: BOMRowWithItem[] = boms.map((bom, i) => ({
    ...bom,
    item: items[i],
    rowCost: items[i].price * bom.consumption,
  }))
  const totalCost = rows.reduce((sum, r) => sum + r.rowCost, 0)
  return { rows, totalCost }
}

export const useBOMWithCost = (articleId: string | undefined) =>
  useQuery({
    queryKey: bomKeys.withItems(articleId ?? ''),
    queryFn: () => fetchBOMWithCost(articleId!),
    enabled: !!articleId,
  })

export const useCreateBOM = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateArticleBOMDto) => bomService.create(dto),
    onSuccess: async (created) => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: bomKeys.byArticle(created.articleId) }),
        qc.invalidateQueries({ queryKey: bomKeys.withItems(created.articleId) }),
        qc.invalidateQueries({ queryKey: bomKeys.all() }),
      ])
    },
  })
}

export const useUpdateBOM = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateArticleBOMDto }) => bomService.update(id, dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: bomKeys.all() }),
  })
}

export const useDeleteBOM = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: bomService.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: bomKeys.all() }),
  })
}
