import { useEffect, useMemo, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Textfield, Select } from '@clovirtualfashion/components'
import { useCreateBOM, useItems } from '../../queries'
import { FormGrid, FormField, FormFieldFull, FieldLabel, ActionRow } from '../Library/dialogs/DialogForm.styled'
import { formatItemPrice, formatTotalCost } from '../../ui/common/utils'
import {
  DialogBody,
  IntroCard,
  IntroEyebrow,
  IntroText,
  PreviewCard,
  PreviewGrid,
  PreviewLabel,
  PreviewMeta,
  PreviewStat,
  PreviewTitle,
  PreviewValue,
} from './BOMRowDialog.styled'

interface BOMRowDialogProps {
  isOpen: boolean
  articleId?: string
  onClose: () => void
}

export const BOMRowDialog = ({ isOpen, articleId, onClose }: BOMRowDialogProps) => {
  const { data: items = [] } = useItems(isOpen)
  const createMutation = useCreateBOM()
  const [itemId, setItemId] = useState('')
  const [consumption, setConsumption] = useState('1')

  useEffect(() => {
    if (isOpen) {
      setItemId('')
      setConsumption('1')
    }
  }, [isOpen])

  const options = useMemo(
    () =>
      items.map((item) => ({
        value: item.id,
        label: `${item.name} · ${item.itemType} · ${item.priceUnit}`,
      })),
    [items]
  )

  const selectedItem = useMemo(
    () => items.find((item) => item.id === itemId),
    [itemId, items]
  )

  const parsedConsumption = Number(consumption)
  const estimatedRowCost =
    selectedItem && Number.isFinite(parsedConsumption) && parsedConsumption > 0
      ? selectedItem.price * parsedConsumption
      : undefined

  const isValid = !!articleId && !!itemId && Number(consumption) > 0

  const handleSubmit = async () => {
    if (!articleId || !itemId) return
    const parsed = Number(consumption)
    if (!Number.isFinite(parsed) || parsed <= 0) return

    await createMutation.mutateAsync({
      articleId,
      itemId,
      consumption: parsed,
    })
    onClose()
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} closeOnOverlayClick>
      <DialogTitle>Add BOM Row</DialogTitle>
      <DialogContent>
        <DialogBody>
          <IntroCard>
            <IntroEyebrow>Build Cost Scenario</IntroEyebrow>
            <IntroText>
              Pick a library item, set how much of it the article consumes, and we&apos;ll estimate the row cost before you save.
            </IntroText>
          </IntroCard>

          <FormGrid>
            <FormFieldFull>
              <FieldLabel>Item</FieldLabel>
              <Select
                options={options}
                value={itemId}
                onChange={(value) => setItemId(String(value))}
                placeholder="Select item..."
                width="100%"
              />
            </FormFieldFull>
            <FormField>
              <FieldLabel>Consumption</FieldLabel>
              <Textfield
                value={consumption}
                onChange={(e) => setConsumption(e.target.value)}
                placeholder="1"
                variant="outline"
                size="m"
                type="number"
              />
            </FormField>
          </FormGrid>

          {selectedItem && (
            <PreviewCard>
              <PreviewTitle>{selectedItem.name}</PreviewTitle>
              <PreviewMeta>{selectedItem.itemCode} · {selectedItem.itemType}</PreviewMeta>
              <PreviewGrid>
                <PreviewStat>
                  <PreviewLabel>Unit Price</PreviewLabel>
                  <PreviewValue>{formatItemPrice(selectedItem.price, selectedItem.priceUnit)}</PreviewValue>
                </PreviewStat>
                <PreviewStat>
                  <PreviewLabel>Consumption</PreviewLabel>
                  <PreviewValue>{Number.isFinite(parsedConsumption) && parsedConsumption > 0 ? parsedConsumption : '—'}</PreviewValue>
                </PreviewStat>
                <PreviewStat>
                  <PreviewLabel>Estimated Cost</PreviewLabel>
                  <PreviewValue>{estimatedRowCost !== undefined ? formatTotalCost(estimatedRowCost) : '—'}</PreviewValue>
                </PreviewStat>
              </PreviewGrid>
            </PreviewCard>
          )}
        </DialogBody>
      </DialogContent>
      <DialogActions>
        <ActionRow>
          <Button styleType="mono" variant="outlined" size="m" onClick={onClose}>Cancel</Button>
          <Button styleType="point" variant="solid" size="m" onClick={handleSubmit} isLoading={createMutation.isPending} disabled={!isValid}>
            Add Row
          </Button>
        </ActionRow>
      </DialogActions>
    </Dialog>
  )
}
