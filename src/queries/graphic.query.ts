import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { graphicService } from '../api/services'
import type { CreateGraphicDto, UpdateGraphicDto } from '../api/types'

export const graphicKeys = {
  all:    () => ['graphics'] as const,
  lists:  () => [...graphicKeys.all(), 'list'] as const,
  detail: (id: string) => [...graphicKeys.all(), 'detail', id] as const,
}

const fetchGraphics = () => graphicService.getAll()

export const useGraphics = (enabled = true) =>
  useQuery({ queryKey: graphicKeys.lists(), queryFn: fetchGraphics, enabled, staleTime: 1000 * 60 * 5 })

export const useGraphic = (id: string | undefined) =>
  useQuery({ queryKey: graphicKeys.detail(id ?? ''), queryFn: () => graphicService.getById(id!), enabled: !!id })

export const useCreateGraphic = () => {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (dto: CreateGraphicDto) => graphicService.create(dto), onSuccess: () => qc.invalidateQueries({ queryKey: graphicKeys.lists() }) })
}

export const useUpdateGraphic = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateGraphicDto }) => graphicService.update(id, dto),
    onSuccess: (updated) => { qc.setQueryData(graphicKeys.detail(updated.id), updated); qc.invalidateQueries({ queryKey: graphicKeys.lists() }) },
  })
}

export const useDeleteGraphic = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: graphicService.remove,
    onSuccess: (_, id) => { qc.removeQueries({ queryKey: graphicKeys.detail(id) }); qc.invalidateQueries({ queryKey: graphicKeys.lists() }) },
  })
}

export const lazyFetchGraphics = fetchGraphics
