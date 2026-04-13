import { Button, IconButton, DeleteIcon, Typography, Select } from '@clovirtualfashion/components'
import { ConfirmDeleteDialog, EmptyState, LoadingSpinner } from '../../ui/common/components'
import { formatItemPrice, formatTotalCost } from '../../ui/common/utils'
import { BOMRowDialog } from './BOMRowDialog'
import {
  Root, Header, HeaderCopy, HeaderMeta, ControlCard, SelectorRow, ArticleMeta, MetaChip,
  OverviewGrid, SummaryBox, SummaryMain, TotalLabel, TotalValue, SummaryCaption, StatCard, StatLabel, StatValue, StatHint,
  TableWrap, TableToolbar, ToolbarCopy, ToolbarTitle, ToolbarMeta, TableHeader, TableRow,
  ColHead, ColCell, NoCell, CostCell, ItemCell, ItemTitle, ItemMetaText, EmptyActionWrap,
} from './Costing.styled'
import { useCosting } from './Costing.hook'

export const Costing = () => {
  const {
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
    isDeletePending,
    requestDelete,
  } = useCosting()

  const articleOptions = articles.map((a) => ({ value: a.id, label: `${a.articleCode} — ${a.colorName}` }))

  return (
    <Root>
      <Header>
        <HeaderCopy>
          <Typography typoName="Normal/Headline/3/Bold">Article Costing</Typography>
          <HeaderMeta>Build BOM rows, remove obsolete components, and keep the material total visible as you iterate.</HeaderMeta>
        </HeaderCopy>
      </Header>

      <ControlCard>
        <SelectorRow>
          <Typography typoName="Normal/Body/3/Bold">Article</Typography>
          {loadingArticles ? (
            <Typography typoName="Normal/Body/4/Normal">Loading...</Typography>
          ) : (
            <Select
              options={articleOptions}
              value={selectedArticleId ?? ''}
              onChange={(v) => setSelectedArticleId(v as string)}
              placeholder="Select an article..."
              width={320}
            />
          )}
        </SelectorRow>

        {selectedArticle && (
          <ArticleMeta>
            <MetaChip>Style {selectedArticle.styleId}</MetaChip>
            <MetaChip accentColor={selectedArticle.colorCode}>{selectedArticle.colorName}</MetaChip>
            <MetaChip>{selectedArticle.articleCode}</MetaChip>
          </ArticleMeta>
        )}
      </ControlCard>

      {selectedArticleId && (
        loadingBOM ? (
          <LoadingSpinner />
        ) : !costSummary || costSummary.rows.length === 0 ? (
          <>
            <EmptyState title="No BOM rows yet" description="There are no BOM rows attached to this article yet." />
            <EmptyActionWrap>
              <Button styleType="point" variant="solid" size="m" onClick={openDialog}>Create first BOM row</Button>
            </EmptyActionWrap>
          </>
        ) : (
          <>
            <OverviewGrid>
              <SummaryBox>
                <SummaryMain>
                  <TotalLabel>Total Material Cost</TotalLabel>
                  <TotalValue>{formatTotalCost(costSummary.totalCost)}</TotalValue>
                </SummaryMain>
                <SummaryCaption>
                  Live BOM estimate for {selectedArticle?.articleCode}. Update rows to explore cost impact immediately.
                </SummaryCaption>
              </SummaryBox>
              <StatCard>
                <StatLabel>BOM Rows</StatLabel>
                <StatValue>{rowCount}</StatValue>
                <StatHint>Components currently included</StatHint>
              </StatCard>
              <StatCard>
                <StatLabel>Highest Row</StatLabel>
                <StatValue>{formatTotalCost(highestRowCost)}</StatValue>
                <StatHint>Largest single cost driver</StatHint>
              </StatCard>
              <StatCard>
                <StatLabel>Average Row</StatLabel>
                <StatValue>{formatTotalCost(averageRowCost)}</StatValue>
                <StatHint>Mean cost across BOM rows</StatHint>
              </StatCard>
            </OverviewGrid>

            <TableWrap>
              <TableToolbar>
                <ToolbarCopy>
                  <ToolbarTitle>BOM Breakdown</ToolbarTitle>
                  <ToolbarMeta>{rowCount} line items mapped to the selected article</ToolbarMeta>
                </ToolbarCopy>
                <Button styleType="point" variant="solid" size="m" onClick={openDialog}>
                  Add Another Row
                </Button>
              </TableToolbar>
              <TableHeader>
                <ColHead>No.</ColHead>
                <ColHead>Item</ColHead>
                <ColHead>Type</ColHead>
                <ColHead>Unit Price</ColHead>
                <ColHead>Consumption</ColHead>
                <ColHead>Row Cost</ColHead>
                <ColHead>Action</ColHead>
              </TableHeader>
              {costSummary.rows.map((row, index) => (
                <TableRow key={row.id}>
                  <NoCell>{String(index + 1).padStart(2, '0')}</NoCell>
                  <ItemCell>
                    <ItemTitle>{row.item.name}</ItemTitle>
                    <ItemMetaText>{row.item.itemCode}</ItemMetaText>
                  </ItemCell>
                  <ColCell>{row.item.itemType}</ColCell>
                  <ColCell>{formatItemPrice(row.item.price, row.item.priceUnit)}</ColCell>
                  <ColCell>{row.consumption} {row.item.priceUnit.split('/')[1]}</ColCell>
                  <CostCell>USD {row.rowCost.toFixed(2)}</CostCell>
                  <IconButton
                    icon={DeleteIcon}
                    size="xs"
                    styleType="mono"
                    backgroundType="glass"
                    onClick={() => requestDelete(row.id, row.item.name)}
                  />
                </TableRow>
              ))}
            </TableWrap>
          </>
        )
      )}

      {!selectedArticleId && (
        <EmptyState title="Select an article" description="Choose an article above to view its BOM and costing breakdown." />
      )}

      <BOMRowDialog isOpen={isDialogOpen} articleId={selectedArticleId} onClose={closeDialog} />
      <ConfirmDeleteDialog
        isOpen={!!deleteTarget}
        onClose={closeDeleteDialog}
        onConfirm={handleDelete}
        itemName={deleteTarget?.name}
        isLoading={isDeletePending}
      />
    </Root>
  )
}
