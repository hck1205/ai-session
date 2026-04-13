import { useQuery } from '@tanstack/react-query'
import { itemService } from '../api/services'

export const itemKeys = {
  all:    () => ['items'] as const,
  lists:  () => [...itemKeys.all(), 'list'] as const,
  detail: (id: string) => [...itemKeys.all(), 'detail', id] as const,
}

export const useItems = (enabled = true) =>
  useQuery({ queryKey: itemKeys.lists(), queryFn: () => itemService.getAll(), enabled, staleTime: 1000 * 60 * 5 })

export const useItem = (id: string | undefined) =>
  useQuery({ queryKey: itemKeys.detail(id ?? ''), queryFn: () => itemService.getById(id!), enabled: !!id })

export const lazyFetchItems = () => itemService.getAll()
