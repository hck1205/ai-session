import { Button, Typography, Search, Select } from '@clovirtualfashion/components'
import { LibraryCard } from '../../ui/molecules/LibraryCard'
import { ConfirmDeleteDialog, EmptyState, LoadingSpinner } from '../../ui/common/components'
import { formatPrice } from '../../ui/common/utils'
import { FabricDialog } from './dialogs/FabricDialog'
import { TrimDialog } from './dialogs/TrimDialog'
import { ButtonDialog } from './dialogs/ButtonDialog'
import { ZipperDialog } from './dialogs/ZipperDialog'
import { GraphicDialog } from './dialogs/GraphicDialog'
import {
  Root, Grid, SearchRow, Header, HeaderCopy, HeaderMeta,
  ControlBar, TabList, TabButton, SearchMeta, FiltersRow, FilterControls, FilterField, FilterLabel,
} from './Library.styled'
import { useLibrary } from './Library.hook'
import type { LibraryTab } from './Library.types'

const TABS: { id: LibraryTab; label: string; accentColor: string }[] = [
  { id: 'fabrics',   label: 'Fabrics',   accentColor: '#0F766E' },
  { id: 'materials', label: 'Materials', accentColor: '#7C3AED' },
  { id: 'trims',     label: 'Trims',     accentColor: '#B45309' },
  { id: 'buttons',   label: 'Buttons',   accentColor: '#BE185D' },
  { id: 'zippers',   label: 'Zippers',   accentColor: '#2563EB' },
  { id: 'graphics',  label: 'Graphics',  accentColor: '#7C2D12' },
]

export const Library = () => {
  const {
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
    editingItem,
    deleteTarget,
    isDeletePending,
    openCreate,
    openEdit,
    closeDialog,
    requestDelete,
    closeDeleteDialog,
    handleConfirmDelete,
  } = useLibrary()

  const currentItems = filteredData[activeTab]
  const activeTabMeta = TABS.find((tab) => tab.id === activeTab)!
  const canCreate = activeTab !== 'materials'

  return (
    <Root>
      <Header>
        <HeaderCopy>
          <Typography typoName="Normal/Headline/3/Bold">Library</Typography>
          <HeaderMeta>Raw materials and trims in one place, with quick create, edit, and delete flows.</HeaderMeta>
        </HeaderCopy>
        {canCreate && (
          <Button styleType="point" variant="solid" size="m" onClick={openCreate}>
            Add {activeTabMeta.label.slice(0, -1)}
          </Button>
        )}
      </Header>

      <ControlBar>
        <TabList>
          {TABS.map((t) => (
            <TabButton
              key={t.id}
              type="button"
              isActive={t.id === activeTab}
              accentColor={t.accentColor}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </TabButton>
          ))}
        </TabList>

        <SearchRow>
          <Search
            value={search}
            onChange={setSearch}
            placeholder="Search by name..."
            variant="borderOutline"
            width={320}
            onClear={() => setSearch('')}
          />
          <SearchMeta accentColor={activeTabMeta.accentColor}>
            {currentItems.length} result{currentItems.length === 1 ? '' : 's'}
          </SearchMeta>
        </SearchRow>

        <FiltersRow>
          <FilterControls>
            <FilterField>
              <FilterLabel>{filterUi.primaryLabel}</FilterLabel>
              <Select
                options={[{ value: '', label: `All ${filterUi.primaryLabel}` }, ...filterUi.primaryOptions]}
                value={primaryFilter}
                onChange={(value) => setPrimaryFilter(String(value))}
                placeholder={`All ${filterUi.primaryLabel}`}
                width={200}
              />
            </FilterField>
            <FilterField>
              <FilterLabel>{filterUi.secondaryLabel}</FilterLabel>
              <Select
                options={[{ value: '', label: `All ${filterUi.secondaryLabel}` }, ...filterUi.secondaryOptions]}
                value={secondaryFilter}
                onChange={(value) => setSecondaryFilter(String(value))}
                placeholder={`All ${filterUi.secondaryLabel}`}
                width={200}
              />
            </FilterField>
            <FilterField>
              <FilterLabel>Sort</FilterLabel>
              <Select
                options={filterUi.sortOptions}
                value={sortBy}
                onChange={(value) => setSortBy(String(value))}
                placeholder="Sort by..."
                width={220}
              />
            </FilterField>
          </FilterControls>

          {hasActiveFilters && (
            <Button styleType="mono" variant="outlined" size="m" onClick={resetFilters}>
              Reset filters
            </Button>
          )}
        </FiltersRow>
      </ControlBar>

      {isLoading ? (
        <LoadingSpinner />
      ) : currentItems.length === 0 ? (
        <EmptyState description="No items match the current search and filter settings." />
      ) : (
        <Grid>
          {activeTab === 'fabrics' && filteredData.fabrics.map((f) => (
            <LibraryCard
              key={f.id}
              id={f.id}
              title={f.name}
              subtitle={f.composition}
              badge={f.construction}
              meta={f.supplier}
              price={formatPrice(f.price)}
              accentColor={activeTabMeta.accentColor}
              onEdit={(id) => openEdit('fabrics', id)}
              onDelete={(id) => requestDelete('fabrics', id, f.name)}
            />
          ))}
          {activeTab === 'materials' && filteredData.materials.map((m) => (
            <LibraryCard
              key={m.id}
              id={m.id}
              title={m.baseColorName ?? m.id}
              subtitle={m.shadingType}
              badge={m.sourceType}
              meta={`Roughness ${m.roughness ?? '—'}% · Metalness ${m.metalness ?? '—'}%`}
              accentColor={activeTabMeta.accentColor}
            />
          ))}
          {activeTab === 'trims' && filteredData.trims.map((t) => (
            <LibraryCard
              key={t.id}
              id={t.id}
              title={t.name}
              subtitle={t.classification}
              meta={t.supplier}
              price={formatPrice(t.price)}
              accentColor={activeTabMeta.accentColor}
              onEdit={(id) => openEdit('trims', id)}
              onDelete={(id) => requestDelete('trims', id, t.name)}
            />
          ))}
          {activeTab === 'buttons' && filteredData.buttons.map((b) => (
            <LibraryCard
              key={b.id}
              id={b.id}
              title={b.name}
              subtitle={b.width ? `⌀ ${b.width}mm` : undefined}
              meta={b.supplier}
              price={formatPrice(b.price)}
              accentColor={activeTabMeta.accentColor}
              onEdit={(id) => openEdit('buttons', id)}
              onDelete={(id) => requestDelete('buttons', id, b.name)}
            />
          ))}
          {activeTab === 'zippers' && filteredData.zippers.map((z) => (
            <LibraryCard
              key={z.id}
              id={z.id}
              title={z.name}
              subtitle={z.materialType}
              badge={z.gauge}
              meta={z.supplier}
              price={formatPrice(z.price)}
              accentColor={activeTabMeta.accentColor}
              onEdit={(id) => openEdit('zippers', id)}
              onDelete={(id) => requestDelete('zippers', id, z.name)}
            />
          ))}
          {activeTab === 'graphics' && filteredData.graphics.map((g) => (
            <LibraryCard
              key={g.id}
              id={g.id}
              title={g.name}
              subtitle={g.width && g.height ? `${g.width} × ${g.height}mm` : undefined}
              meta={g.supplier}
              price={formatPrice(g.price)}
              accentColor={activeTabMeta.accentColor}
              onEdit={(id) => openEdit('graphics', id)}
              onDelete={(id) => requestDelete('graphics', id, g.name)}
            />
          ))}
        </Grid>
      )}

      <FabricDialog
        isOpen={dialogState?.tab === 'fabrics'}
        onClose={closeDialog}
        editing={dialogState?.tab === 'fabrics' && dialogState.mode === 'edit' ? editingItem : undefined}
      />
      <TrimDialog
        isOpen={dialogState?.tab === 'trims'}
        onClose={closeDialog}
        editing={dialogState?.tab === 'trims' && dialogState.mode === 'edit' ? editingItem : undefined}
      />
      <ButtonDialog
        isOpen={dialogState?.tab === 'buttons'}
        onClose={closeDialog}
        editing={dialogState?.tab === 'buttons' && dialogState.mode === 'edit' ? editingItem : undefined}
      />
      <ZipperDialog
        isOpen={dialogState?.tab === 'zippers'}
        onClose={closeDialog}
        editing={dialogState?.tab === 'zippers' && dialogState.mode === 'edit' ? editingItem : undefined}
      />
      <GraphicDialog
        isOpen={dialogState?.tab === 'graphics'}
        onClose={closeDialog}
        editing={dialogState?.tab === 'graphics' && dialogState.mode === 'edit' ? editingItem : undefined}
      />
      <ConfirmDeleteDialog
        isOpen={!!deleteTarget}
        onClose={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
        itemName={deleteTarget?.name}
        isLoading={isDeletePending}
      />
    </Root>
  )
}
