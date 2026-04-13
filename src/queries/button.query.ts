import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { buttonService } from '../api/services'
import type { CreateButtonDto, UpdateButtonDto } from '../api/types'

export const buttonKeys = {
  all:    () => ['buttons'] as const,
  lists:  () => [...buttonKeys.all(), 'list'] as const,
  detail: (id: string) => [...buttonKeys.all(), 'detail', id] as const,
}

const fetchButtons = () => buttonService.getAll()

export const useButtons = (enabled = true) =>
  useQuery({ queryKey: buttonKeys.lists(), queryFn: fetchButtons, enabled, staleTime: 1000 * 60 * 5 })

export const useButton = (id: string | undefined) =>
  useQuery({ queryKey: buttonKeys.detail(id ?? ''), queryFn: () => buttonService.getById(id!), enabled: !!id })

export const useCreateButton = () => {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (dto: CreateButtonDto) => buttonService.create(dto), onSuccess: () => qc.invalidateQueries({ queryKey: buttonKeys.lists() }) })
}

export const useUpdateButton = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateButtonDto }) => buttonService.update(id, dto),
    onSuccess: (updated) => { qc.setQueryData(buttonKeys.detail(updated.id), updated); qc.invalidateQueries({ queryKey: buttonKeys.lists() }) },
  })
}

export const useDeleteButton = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: buttonService.remove,
    onSuccess: (_, id) => { qc.removeQueries({ queryKey: buttonKeys.detail(id) }); qc.invalidateQueries({ queryKey: buttonKeys.lists() }) },
  })
}

export const lazyFetchButtons = fetchButtons
