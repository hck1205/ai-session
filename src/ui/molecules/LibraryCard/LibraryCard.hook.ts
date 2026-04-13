import { useCallback } from 'react'
import type { LibraryCardProps } from './LibraryCard.types'

export const useLibraryCard = ({ id, onClick, onEdit, onDelete }: Pick<LibraryCardProps, 'id' | 'onClick' | 'onEdit' | 'onDelete'>) => {
  const handleClick = useCallback(() => onClick?.(id), [id, onClick])
  const handleEdit = useCallback((e: React.MouseEvent) => { e.stopPropagation(); onEdit?.(id) }, [id, onEdit])
  const handleDelete = useCallback((e: React.MouseEvent) => { e.stopPropagation(); onDelete?.(id) }, [id, onDelete])
  return { handleClick, handleEdit, handleDelete }
}
