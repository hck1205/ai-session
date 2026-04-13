import { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Textfield } from '@clovirtualfashion/components'
import { useCreateTrim, useUpdateTrim } from '../../../queries'
import { FormGrid, FormField, FormFieldFull, FieldLabel, ActionRow } from './DialogForm.styled'
import type { Trim, CreateTrimDto } from '../../../api/types'

interface TrimDialogProps {
  isOpen: boolean
  onClose: () => void
  editing?: Trim
}

const EMPTY: CreateTrimDto = { name: '', supplier: '', classification: '', owner: 'CLO' }

export const TrimDialog = ({ isOpen, onClose, editing }: TrimDialogProps) => {
  const [form, setForm] = useState<CreateTrimDto>(EMPTY)
  const createMutation = useCreateTrim()
  const updateMutation = useUpdateTrim()

  useEffect(() => {
    if (isOpen) {
      setForm(
        editing
          ? {
              name: editing.name,
              supplier: editing.supplier ?? '',
              classification: editing.classification ?? '',
              owner: editing.owner ?? 'CLO',
              price: editing.price,
            }
          : EMPTY
      )
    }
  }, [isOpen, editing])

  const set = (key: keyof CreateTrimDto) => (e: React.ChangeEvent<HTMLInputElement>) =>
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
      <DialogTitle>{editing ? 'Edit Trim' : 'New Trim'}</DialogTitle>
      <DialogContent>
        <FormGrid>
          <FormFieldFull>
            <FieldLabel>Name *</FieldLabel>
            <Textfield value={form.name} onChange={set('name')} placeholder="e.g. Grosgrain Ribbon" variant="outline" size="m" />
          </FormFieldFull>
          <FormField>
            <FieldLabel>Classification</FieldLabel>
            <Textfield value={form.classification ?? ''} onChange={set('classification')} placeholder="e.g. Elastic" variant="outline" size="m" />
          </FormField>
          <FormField>
            <FieldLabel>Supplier</FieldLabel>
            <Textfield value={form.supplier ?? ''} onChange={set('supplier')} placeholder="e.g. Coats" variant="outline" size="m" />
          </FormField>
          <FormField>
            <FieldLabel>Price</FieldLabel>
            <Textfield value={form.price?.amount?.toString() ?? ''} onChange={setPrice('amount')} placeholder="0.85" variant="outline" size="m" type="number" />
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
