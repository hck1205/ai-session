import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fabricService } from '../api/services'
import type { CreateFabricDto, UpdateFabricDto } from '../api/types'

export const fabricKeys = {
  all:    () => ['fabrics'] as const,
  lists:  () => [...fabricKeys.all(), 'list'] as const,
  detail: (id: string) => [...fabricKeys.all(), 'detail', id] as const,
}

const fetchFabrics = () => fabricService.getAll()
const fetchFabricById = (id: string) => fabricService.getById(id)

/** @param enabled false 전달 시 lazy 동작 — 검색어 미입력 상태 등 */
export const useFabrics = (enabled = true) =>
  useQuery({ queryKey: fabricKeys.lists(), queryFn: fetchFabrics, enabled, staleTime: 1000 * 60 * 5 })

export const useFabric = (id: string | undefined) =>
  useQuery({ queryKey: fabricKeys.detail(id ?? ''), queryFn: () => fetchFabricById(id!), enabled: !!id })

export const useCreateFabric = () => {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (dto: CreateFabricDto) => fabricService.create(dto), onSuccess: () => qc.invalidateQueries({ queryKey: fabricKeys.lists() }) })
}

export const useUpdateFabric = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateFabricDto }) => fabricService.update(id, dto),
    onSuccess: (updated) => { qc.setQueryData(fabricKeys.detail(updated.id), updated); qc.invalidateQueries({ queryKey: fabricKeys.lists() }) },
  })
}

export const useDeleteFabric = () => {
  const qc = useQueryClient()
  return useMutation({ mutationFn: fabricService.remove, onSuccess: (_, id) => { qc.removeQueries({ queryKey: fabricKeys.detail(id) }); qc.invalidateQueries({ queryKey: fabricKeys.lists() }) } })
}

export const lazyFetchFabrics = fetchFabrics
export const lazyFetchFabricById = fetchFabricById
