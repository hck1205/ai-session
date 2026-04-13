import { useState } from 'react'
import { useArticles } from '../../queries/article.query'
import { useBOMWithCost, useDeleteBOM } from '../../queries'

export const useCosting = () => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | undefined>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null)

  const { data: articles = [], isLoading: loadingArticles } = useArticles()
  const { data: costSummary, isLoading: loadingBOM } = useBOMWithCost(selectedArticleId)
  const deleteBOM = useDeleteBOM()

  const selectedArticle = articles.find((a) => a.id === selectedArticleId)
  const rowCount = costSummary?.rows.length ?? 0
  const highestRowCost = costSummary?.rows.reduce((max, row) => Math.max(max, row.rowCost), 0) ?? 0
  const averageRowCost = rowCount > 0 && costSummary ? costSummary.totalCost / rowCount : 0

  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)

  const requestDelete = (id: string, name: string) => setDeleteTarget({ id, name })
  const closeDeleteDialog = () => setDeleteTarget(null)

  const handleDelete = async () => {
    if (!deleteTarget) return
    await deleteBOM.mutateAsync(deleteTarget.id)
    setDeleteTarget(null)
  }

  return {
    articles,
    loadingArticles,
    selectedArticleId,
    setSelectedArticleId,
    selectedArticle,
    costSummary,
    loadingBOM,
    rowCount,
    highestRowCost,
    averageRowCost,
    isDialogOpen,
    openDialog,
    closeDialog,
    deleteTarget,
    closeDeleteDialog,
    handleDelete,
    isDeletePending: deleteBOM.isPending,
    requestDelete,
  }
}
