import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { trimService } from '../api/services'
import type { CreateTrimDto, UpdateTrimDto } from '../api/types'

export const trimKeys = {
  all:    () => ['trims'] as const,
  lists:  () => [...trimKeys.all(), 'list'] as const,
  detail: (id: string) => [...trimKeys.all(), 'detail', id] as const,
}

const fetchTrims = () => trimService.getAll()

export const useTrims = (enabled = true) =>
  useQuery({ queryKey: trimKeys.lists(), queryFn: fetchTrims, enabled, staleTime: 1000 * 60 * 5 })

export const useTrim = (id: string | undefined) =>
  useQuery({ queryKey: trimKeys.detail(id ?? ''), queryFn: () => trimService.getById(id!), enabled: !!id })

export const useCreateTrim = () => {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (dto: CreateTrimDto) => trimService.create(dto), onSuccess: () => qc.invalidateQueries({ queryKey: trimKeys.lists() }) })
}

export const useUpdateTrim = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTrimDto }) => trimService.update(id, dto),
    onSuccess: (updated) => { qc.setQueryData(trimKeys.detail(updated.id), updated); qc.invalidateQueries({ queryKey: trimKeys.lists() }) },
  })
}

export const useDeleteTrim = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: trimService.remove,
    onSuccess: (_, id) => { qc.removeQueries({ queryKey: trimKeys.detail(id) }); qc.invalidateQueries({ queryKey: trimKeys.lists() }) },
  })
}

export const lazyFetchTrims = fetchTrims
