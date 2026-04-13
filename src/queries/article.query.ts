import { useQuery } from '@tanstack/react-query'
import { articleService } from '../api/services'

export const articleKeys = {
  all:    () => ['articles'] as const,
  lists:  () => [...articleKeys.all(), 'list'] as const,
  detail: (id: string) => [...articleKeys.all(), 'detail', id] as const,
}

export const useArticles = (enabled = true) =>
  useQuery({ queryKey: articleKeys.lists(), queryFn: () => articleService.getAll(), enabled, staleTime: 1000 * 60 * 5 })

export const useArticle = (id: string | undefined) =>
  useQuery({ queryKey: articleKeys.detail(id ?? ''), queryFn: () => articleService.getById(id!), enabled: !!id })

export const lazyFetchArticles = () => articleService.getAll()
