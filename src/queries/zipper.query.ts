import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { zipperService } from '../api/services'
import type { CreateZipperDto, UpdateZipperDto } from '../api/types'

export const zipperKeys = {
  all:    () => ['zippers'] as const,
  lists:  () => [...zipperKeys.all(), 'list'] as const,
  detail: (id: string) => [...zipperKeys.all(), 'detail', id] as const,
}

const fetchZippers = () => zipperService.getAll()

export const useZippers = (enabled = true) =>
  useQuery({ queryKey: zipperKeys.lists(), queryFn: fetchZippers, enabled, staleTime: 1000 * 60 * 5 })

export const useZipper = (id: string | undefined) =>
  useQuery({ queryKey: zipperKeys.detail(id ?? ''), queryFn: () => zipperService.getById(id!), enabled: !!id })

export const useCreateZipper = () => {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (dto: CreateZipperDto) => zipperService.create(dto), onSuccess: () => qc.invalidateQueries({ queryKey: zipperKeys.lists() }) })
}

export const useUpdateZipper = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateZipperDto }) => zipperService.update(id, dto),
    onSuccess: (updated) => { qc.setQueryData(zipperKeys.detail(updated.id), updated); qc.invalidateQueries({ queryKey: zipperKeys.lists() }) },
  })
}

export const useDeleteZipper = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: zipperService.remove,
    onSuccess: (_, id) => { qc.removeQueries({ queryKey: zipperKeys.detail(id) }); qc.invalidateQueries({ queryKey: zipperKeys.lists() }) },
  })
}

export const lazyFetchZippers = fetchZippers
