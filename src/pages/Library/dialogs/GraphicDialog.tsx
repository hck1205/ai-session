import { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Textfield } from '@clovirtualfashion/components'
import { useCreateGraphic, useUpdateGraphic } from '../../../queries'
import { FormGrid, FormField, FormFieldFull, FieldLabel, ActionRow } from './DialogForm.styled'
import type { Graphic, CreateGraphicDto } from '../../../api/types'

interface GraphicDialogProps {
  isOpen: boolean
  onClose: () => void
  editing?: Graphic
}

const EMPTY: CreateGraphicDto = { name: '', supplier: '', owner: 'CLO' }

export const GraphicDialog = ({ isOpen, onClose, editing }: GraphicDialogProps) => {
  const [form, setForm] = useState<CreateGraphicDto>(EMPTY)
  const createMutation = useCreateGraphic()
  const updateMutation = useUpdateGraphic()

  useEffect(() => {
    if (isOpen) {
      setForm(
        editing
          ? {
              name: editing.name,
              supplier: editing.supplier ?? '',
              owner: editing.owner ?? 'CLO',
              width: editing.width,
              height: editing.height,
              price: editing.price,
            }
          : EMPTY
      )
    }
  }, [isOpen, editing])

  const set = (key: keyof CreateGraphicDto) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const setNum = (key: keyof CreateGraphicDto) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value ? Number(e.target.value) : undefined }))

  const setPrice = (key: 'amount' | 'currency' | 'unit') => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({
      ...prev,
      price: {
        amount: key === 'amount' ? Number(e.target.value || 0) : prev.price?.amount ?? 0,
        currency: key === 'currency' ? e.target.value : prev.price?.currency ?? 'USD',
        unit: key === 'unit' ? e.target.value : prev.price?.unit ?? 'piece',
      },
    }))

  const handleSubmit = async () => {
    if (!form.name.trim()) return
    if (editing) await updateMutation.mutateAsync({ id: editing.id, dto: form })
    else await createMutation.mutateAsync(form)
    onClose()
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog isOpen={isOpen} onClose={onClose} closeOnOverlayClick>
      <DialogTitle>{editing ? 'Edit Graphic' : 'New Graphic'}</DialogTitle>
      <DialogContent>
        <FormGrid>
          <FormFieldFull>
            <FieldLabel>Name *</FieldLabel>
            <Textfield value={form.name} onChange={set('name')} placeholder="e.g. Rubber Patch Logo" variant="outline" size="m" />
          </FormFieldFull>
          <FormField>
            <FieldLabel>Width (mm)</FieldLabel>
            <Textfield value={form.width?.toString() ?? ''} onChange={setNum('width')} placeholder="45" variant="outline" size="m" type="number" />
          </FormField>
          <FormField>
            <FieldLabel>Height (mm)</FieldLabel>
            <Textfield value={form.height?.toString() ?? ''} onChange={setNum('height')} placeholder="25" variant="outline" size="m" type="number" />
          </FormField>
          <FormFieldFull>
            <FieldLabel>Supplier</FieldLabel>
            <Textfield value={form.supplier ?? ''} onChange={set('supplier')} placeholder="e.g. Trim House" variant="outline" size="m" />
          </FormFieldFull>
          <FormField>
            <FieldLabel>Price</FieldLabel>
            <Textfield value={form.price?.amount?.toString() ?? ''} onChange={setPrice('amount')} placeholder="0.90" variant="outline" size="m" type="number" />
          </FormField>
          <FormField>
            <FieldLabel>Currency</FieldLabel>
            <Textfield value={form.price?.currency ?? 'USD'} onChange={setPrice('currency')} placeholder="USD" variant="outline" size="m" />
          </FormField>
          <FormField>
            <FieldLabel>Unit</FieldLabel>
            <Textfield value={form.price?.unit ?? 'piece'} onChange={setPrice('unit')} placeholder="piece" variant="outline" size="m" />
          </FormField>
        </FormGrid>
      </DialogContent>
      <DialogActions>
        <ActionRow>
          <Button styleType="mono" variant="outlined" size="m" onClick={onClose}>Cancel</Button>
          <Button styleType="point" variant="solid" size="m" onClick={handleSubmit} isLoading={isPending} disabled={!form.name.trim()}>
            {editing ? 'Save' : 'Create'}
          </Button>
        </ActionRow>
      </DialogActions>
    </Dialog>
  )
}
