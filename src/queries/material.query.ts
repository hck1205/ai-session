import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { materialService } from '../api/services'
import type { CreateMaterialDto, UpdateMaterialDto } from '../api/types'

export const materialKeys = {
  all:    () => ['materials'] as const,
  lists:  () => [...materialKeys.all(), 'list'] as const,
  detail: (id: string) => [...materialKeys.all(), 'detail', id] as const,
}

const fetchMaterials = () => materialService.getAll()
const fetchMaterialById = (id: string) => materialService.getById(id)

export const useMaterials = (enabled = true) =>
  useQuery({ queryKey: materialKeys.lists(), queryFn: fetchMaterials, enabled, staleTime: 1000 * 60 * 5 })

export const useMaterial = (id: string | undefined) =>
  useQuery({ queryKey: materialKeys.detail(id ?? ''), queryFn: () => fetchMaterialById(id!), enabled: !!id })

export const useCreateMaterial = () => {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (dto: CreateMaterialDto) => materialService.create(dto), onSuccess: () => qc.invalidateQueries({ queryKey: materialKeys.lists() }) })
}

export const useUpdateMaterial = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateMaterialDto }) => materialService.update(id, dto),
    onSuccess: (updated) => { qc.setQueryData(materialKeys.detail(updated.id), updated); qc.invalidateQueries({ queryKey: materialKeys.lists() }) },
  })
}

export const lazyFetchMaterials = fetchMaterials
export const lazyFetchMaterialById = fetchMaterialById
