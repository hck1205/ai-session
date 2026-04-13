import { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Textfield } from '@clovirtualfashion/components'
import { useCreateZipper, useUpdateZipper } from '../../../queries'
import { FormGrid, FormField, FormFieldFull, FieldLabel, ActionRow } from './DialogForm.styled'
import type { Zipper, CreateZipperDto } from '../../../api/types'

interface ZipperDialogProps {
  isOpen: boolean
  onClose: () => void
  editing?: Zipper
}

const EMPTY: CreateZipperDto = { name: '', supplier: '', materialType: '', gauge: '', owner: 'CLO' }

export const ZipperDialog = ({ isOpen, onClose, editing }: ZipperDialogProps) => {
  const [form, setForm] = useState<CreateZipperDto>(EMPTY)
  const createMutation = useCreateZipper()
  const updateMutation = useUpdateZipper()

  useEffect(() => {
    if (isOpen) {
      setForm(
        editing
          ? {
              name: editing.name,
              supplier: editing.supplier ?? '',
              materialType: editing.materialType ?? '',
              gauge: editing.gauge ?? '',
              function: editing.function ?? '',
              owner: editing.owner ?? 'CLO',
              price: editing.price,
            }
          : EMPTY
      )
    }
  }, [isOpen, editing])

  const set = (key: keyof CreateZipperDto) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

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
      <DialogTitle>{editing ? 'Edit Zipper' : 'New Zipper'}</DialogTitle>
      <DialogContent>
        <FormGrid>
          <FormFieldFull>
            <FieldLabel>Name *</FieldLabel>
            <Textfield value={form.name} onChange={set('name')} placeholder="e.g. YKK #5 Nylon Coil" variant="outline" size="m" />
          </FormFieldFull>
          <FormField>
            <FieldLabel>Material Type</FieldLabel>
            <Textfield value={form.materialType ?? ''} onChange={set('materialType')} placeholder="nylon / metal / plastic" variant="outline" size="m" />
          </FormField>
          <FormField>
            <FieldLabel>Gauge</FieldLabel>
            <Textfield value={form.gauge ?? ''} onChange={set('gauge')} placeholder="#5" variant="outline" size="m" />
          </FormField>
          <FormField>
            <FieldLabel>Function</FieldLabel>
            <Textfield value={form.function ?? ''} onChange={set('function')} placeholder="one-way / two-way" variant="outline" size="m" />
          </FormField>
          <FormField>
            <FieldLabel>Supplier</FieldLabel>
            <Textfield value={form.supplier ?? ''} onChange={set('supplier')} placeholder="e.g. YKK" variant="outline" size="m" />
          </FormField>
          <FormField>
            <FieldLabel>Price</FieldLabel>
            <Textfield value={form.price?.amount?.toString() ?? ''} onChange={setPrice('amount')} placeholder="1.20" variant="outline" size="m" type="number" />
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
