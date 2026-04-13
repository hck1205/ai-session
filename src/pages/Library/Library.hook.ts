import { useEffect, useMemo, useState } from 'react'
import { useDebounce } from '../../hooks'
import {
  useButtons,
  useDeleteButton,
  useDeleteFabric,
  useDeleteGraphic,
  useDeleteTrim,
  useDeleteZipper,
  useFabrics,
  useGraphics,
  useMaterials,
  useTrims,
  useZippers,
} from '../../queries'
import type { Button, Fabric, Graphic, Material, Trim, Zipper } from '../../api/types'
import type { LibraryTab } from './Library.types'

type DialogState = { mode: 'create' | 'edit'; tab: Exclude<LibraryTab, 'materials'> } | null
type SelectOption = { value: string; label: string }

const DEFAULT_SORT = 'name-asc'

const uniqueOptions = (values: Array<string | undefined | null>): SelectOption[] =>
  [...new Set(values.filter((value): value is string => !!value && value.trim().length > 0))]
    .sort((a, b) => a.localeCompare(b))
    .map((value) => ({ value, label: value }))

const buttonSizeBucket = (width?: number) => {
  if (width === undefined) return 'Unknown'
  if (width < 18) return 'Small'
  if (width < 24) return 'Medium'
  return 'Large'
}

const graphicSizeBucket = (graphic: Graphic) => {
  const area = (graphic.width ?? 0) * (graphic.height ?? 0)
  if (!area) return 'Unknown'
  if (area < 1200) return 'Small'
  if (area < 3000) return 'Medium'
  return 'Large'
}

const byAlpha = (a?: string, b?: string) => (a ?? '').localeCompare(b ?? '')
const byPrice = (a?: { amount: number }, b?: { amount: number }) => (a?.amount ?? 0) - (b?.amount ?? 0)

export const useLibrary = () => {
  const [activeTab, setActiveTab] = useState<LibraryTab>('fabrics')
  const [search, setSearch] = useState('')
  const [primaryFilter, setPrimaryFilter] = useState('')
  const [secondaryFilter, setSecondaryFilter] = useState('')
  const [sortBy, setSortBy] = useState(DEFAULT_SORT)
  const [dialogState, setDialogState] = useState<DialogState>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string; tab: Exclude<LibraryTab, 'materials'> } | null>(null)
  const debouncedSearch = useDebounce(search, 300)

  const { data: fabrics = [],   isLoading: loadingFabrics }   = useFabrics()
  const { data: materials = [],  isLoading: loadingMaterials }  = useMaterials()
  const { data: trims = [],      isLoading: loadingTrims }      = useTrims()
  const { data: buttons = [],    isLoading: loadingButtons }    = useButtons()
  const { data: zippers = [],    isLoading: loadingZippers }    = useZippers()
  const { data: graphics = [],   isLoading: loadingGraphics }   = useGraphics()
  const deleteFabric = useDeleteFabric()
  const deleteTrim = useDeleteTrim()
  const deleteButton = useDeleteButton()
  const deleteZipper = useDeleteZipper()
  const deleteGraphic = useDeleteGraphic()

  const dataByTab = useMemo(
    () => ({ fabrics, materials, trims, buttons, zippers, graphics }),
    [buttons, fabrics, graphics, materials, trims, zippers]
  )

  useEffect(() => {
    setPrimaryFilter('')
    setSecondaryFilter('')
    setSortBy(DEFAULT_SORT)
  }, [activeTab])

  const filterUi = useMemo(() => {
    const sortOptions: SelectOption[] =
      activeTab === 'materials'
        ? [
            { value: 'name-asc', label: 'Color name A-Z' },
            { value: 'name-desc', label: 'Color name Z-A' },
            { value: 'roughness-desc', label: 'Roughness high-low' },
            { value: 'metalness-desc', label: 'Metalness high-low' },
          ]
        : [
            { value: 'name-asc', label: 'Name A-Z' },
            { value: 'name-desc', label: 'Name Z-A' },
            { value: 'price-asc', label: 'Price low-high' },
            { value: 'price-desc', label: 'Price high-low' },
          ]

    if (activeTab === 'fabrics') {
      return {
        primaryLabel: 'Supplier',
        primaryOptions: uniqueOptions(fabrics.map((item) => item.supplier)),
        secondaryLabel: 'Construction',
        secondaryOptions: uniqueOptions(fabrics.map((item) => item.construction)),
        sortOptions,
      }
    }
    if (activeTab === 'materials') {
      return {
        primaryLabel: 'Shading',
        primaryOptions: uniqueOptions(materials.map((item) => item.shadingType)),
        secondaryLabel: 'Source',
        secondaryOptions: uniqueOptions(materials.map((item) => item.sourceType)),
        sortOptions,
      }
    }
    if (activeTab === 'trims') {
      return {
        primaryLabel: 'Supplier',
        primaryOptions: uniqueOptions(trims.map((item) => item.supplier)),
        secondaryLabel: 'Classification',
        secondaryOptions: uniqueOptions(trims.map((item) => item.classification)),
        sortOptions,
      }
    }
    if (activeTab === 'buttons') {
      return {
        primaryLabel: 'Supplier',
        primaryOptions: uniqueOptions(buttons.map((item) => item.supplier)),
        secondaryLabel: 'Size',
        secondaryOptions: uniqueOptions(buttons.map((item) => buttonSizeBucket(item.width))),
        sortOptions,
      }
    }
    if (activeTab === 'zippers') {
      return {
        primaryLabel: 'Supplier',
        primaryOptions: uniqueOptions(zippers.map((item) => item.supplier)),
        secondaryLabel: 'Material',
        secondaryOptions: uniqueOptions(zippers.map((item) => item.materialType)),
        sortOptions,
      }
    }
    return {
      primaryLabel: 'Supplier',
      primaryOptions: uniqueOptions(graphics.map((item) => item.supplier)),
      secondaryLabel: 'Scale',
      secondaryOptions: uniqueOptions(graphics.map((item) => graphicSizeBucket(item))),
      sortOptions,
    }
  }, [activeTab, buttons, fabrics, graphics, materials, trims, zippers])

  const filteredData = useMemo(() => {
    const q = debouncedSearch.toLowerCase()

    const filterByName = <T,>(items: T[], getName: (item: T) => string) =>
      q ? items.filter((item) => getName(item).toLowerCase().includes(q)) : items

    const sortByNameAndPrice = <T extends { name: string; price?: { amount: number } }>(items: T[]) => {
      const next = [...items]
      if (sortBy === 'name-desc') return next.sort((a, b) => byAlpha(b.name, a.name))
      if (sortBy === 'price-asc') return next.sort((a, b) => byPrice(a.price, b.price))
      if (sortBy === 'price-desc') return next.sort((a, b) => byPrice(b.price, a.price))
      return next.sort((a, b) => byAlpha(a.name, b.name))
    }

    const sortMaterials = (items: Material[]) => {
      const next = [...items]
      if (sortBy === 'name-desc') return next.sort((a, b) => byAlpha(b.baseColorName, a.baseColorName))
      if (sortBy === 'roughness-desc') return next.sort((a, b) => (b.roughness ?? 0) - (a.roughness ?? 0))
      if (sortBy === 'metalness-desc') return next.sort((a, b) => (b.metalness ?? 0) - (a.metalness ?? 0))
      return next.sort((a, b) => byAlpha(a.baseColorName, b.baseColorName))
    }

    return {
      fabrics: sortByNameAndPrice(
        filterByName(fabrics, (item) => item.name).filter(
          (item) =>
            (!primaryFilter || item.supplier === primaryFilter) &&
            (!secondaryFilter || item.construction === secondaryFilter)
        )
      ),
      materials: sortMaterials(
        filterByName(materials, (item) => item.baseColorName ?? item.id).filter(
          (item) =>
            (!primaryFilter || item.shadingType === primaryFilter) &&
            (!secondaryFilter || item.sourceType === secondaryFilter)
        )
      ),
      trims: sortByNameAndPrice(
        filterByName(trims, (item) => item.name).filter(
          (item) =>
            (!primaryFilter || item.supplier === primaryFilter) &&
            (!secondaryFilter || item.classification === secondaryFilter)
        )
      ),
      buttons: sortByNameAndPrice(
        filterByName(buttons, (item) => item.name).filter(
          (item) =>
            (!primaryFilter || item.supplier === primaryFilter) &&
            (!secondaryFilter || buttonSizeBucket(item.width) === secondaryFilter)
        )
      ),
      zippers: sortByNameAndPrice(
        filterByName(zippers, (item) => item.name).filter(
          (item) =>
            (!primaryFilter || item.supplier === primaryFilter) &&
            (!secondaryFilter || item.materialType === secondaryFilter)
        )
      ),
      graphics: sortByNameAndPrice(
        filterByName(graphics, (item) => item.name).filter(
          (item) =>
            (!primaryFilter || item.supplier === primaryFilter) &&
            (!secondaryFilter || graphicSizeBucket(item) === secondaryFilter)
        )
      ),
    }
  }, [debouncedSearch, fabrics, materials, trims, buttons, zippers, graphics, primaryFilter, secondaryFilter, sortBy])

  const isLoading = loadingFabrics || loadingMaterials || loadingTrims || loadingButtons || loadingZippers || loadingGraphics

  const editingItem = useMemo(() => {
    if (!dialogState || !editingId) return undefined
    return dataByTab[dialogState.tab].find((item) => item.id === editingId)
  }, [dataByTab, dialogState, editingId])

  const openCreate = () => {
    if (activeTab === 'materials') return
    setEditingId(null)
    setDialogState({ mode: 'create', tab: activeTab })
  }

  const openEdit = (tab: Exclude<LibraryTab, 'materials'>, id: string) => {
    setEditingId(id)
    setDialogState({ mode: 'edit', tab })
  }

  const closeDialog = () => {
    setDialogState(null)
    setEditingId(null)
  }

  const requestDelete = (tab: Exclude<LibraryTab, 'materials'>, id: string, name: string) => {
    setDeleteTarget({ tab, id, name })
  }

  const closeDeleteDialog = () => setDeleteTarget(null)

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    if (deleteTarget.tab === 'fabrics') await deleteFabric.mutateAsync(deleteTarget.id)
    if (deleteTarget.tab === 'trims') await deleteTrim.mutateAsync(deleteTarget.id)
    if (deleteTarget.tab === 'buttons') await deleteButton.mutateAsync(deleteTarget.id)
    if (deleteTarget.tab === 'zippers') await deleteZipper.mutateAsync(deleteTarget.id)
    if (deleteTarget.tab === 'graphics') await deleteGraphic.mutateAsync(deleteTarget.id)
    setDeleteTarget(null)
  }

  const isDeletePending =
    deleteFabric.isPending ||
    deleteTrim.isPending ||
    deleteButton.isPending ||
    deleteZipper.isPending ||
    deleteGraphic.isPending

  const resetFilters = () => {
    setPrimaryFilter('')
    setSecondaryFilter('')
    setSortBy(DEFAULT_SORT)
  }

  const hasActiveFilters = !!(primaryFilter || secondaryFilter || sortBy !== DEFAULT_SORT)

  return {
    activeTab,
    setActiveTab,
    search,
    setSearch,
    filteredData,
    isLoading,
    primaryFilter,
    setPrimaryFilter,
    secondaryFilter,
    setSecondaryFilter,
    sortBy,
    setSortBy,
    filterUi,
    resetFilters,
    hasActiveFilters,
    dialogState,
    editingItem: editingItem as Fabric | Trim | Button | Zipper | Graphic | undefined,
    deleteTarget,
    isDeletePending,
    openCreate,
    openEdit,
    closeDialog,
    requestDelete,
    closeDeleteDialog,
    handleConfirmDelete,
  }
}
