import { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Textfield } from '@clovirtualfashion/components'
import { useCreateButton, useUpdateButton } from '../../../queries'
import { FormGrid, FormField, FormFieldFull, FieldLabel, ActionRow } from './DialogForm.styled'
import type { Button as ButtonEntity, CreateButtonDto } from '../../../api/types'

interface ButtonDialogProps {
  isOpen: boolean
  onClose: () => void
  editing?: ButtonEntity
}

const EMPTY: CreateButtonDto = { name: '', supplier: '', owner: 'CLO' }

export const ButtonDialog = ({ isOpen, onClose, editing }: ButtonDialogProps) => {
  const [form, setForm] = useState<CreateButtonDto>(EMPTY)
  const createMutation = useCreateButton()
  const updateMutation = useUpdateButton()

  useEffect(() => {
    if (isOpen) {
      setForm(
        editing
          ? {
              name: editing.name,
              supplier: editing.supplier ?? '',
              owner: editing.owner ?? 'CLO',
              width: editing.width,
              thickness: editing.thickness,
              price: editing.price,
            }
          : EMPTY
      )
    }
  }, [isOpen, editing])

  const set = (key: keyof CreateButtonDto) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const setNum = (key: keyof CreateButtonDto) => (e: React.ChangeEvent<HTMLInputElement>) =>
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
      <DialogTitle>{editing ? 'Edit Button' : 'New Button'}</DialogTitle>
      <DialogContent>
        <FormGrid>
          <FormFieldFull>
            <FieldLabel>Name *</FieldLabel>
            <Textfield value={form.name} onChange={set('name')} placeholder="e.g. Horn Button 20mm" variant="outline" size="m" />
          </FormFieldFull>
          <FormField>
            <FieldLabel>Width (mm)</FieldLabel>
            <Textfield value={form.width?.toString() ?? ''} onChange={setNum('width')} placeholder="20" variant="outline" size="m" type="number" />
          </FormField>
          <FormField>
            <FieldLabel>Thickness (mm)</FieldLabel>
            <Textfield value={form.thickness?.toString() ?? ''} onChange={setNum('thickness')} placeholder="4.5" variant="outline" size="m" type="number" />
          </FormField>
          <FormField>
            <FieldLabel>Supplier</FieldLabel>
            <Textfield value={form.supplier ?? ''} onChange={set('supplier')} placeholder="e.g. Italy Button" variant="outline" size="m" />
          </FormField>
          <FormField>
            <FieldLabel>Price</FieldLabel>
            <Textfield value={form.price?.amount?.toString() ?? ''} onChange={setPrice('amount')} placeholder="0.35" variant="outline" size="m" type="number" />
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
