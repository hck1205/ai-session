import { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Textfield, Typography } from '@clovirtualfashion/components'
import { useCreateFabric, useUpdateFabric } from '../../../queries'
import { FormGrid, FormField, FormFieldFull, FieldLabel, ActionRow } from './DialogForm.styled'
import type { Fabric, CreateFabricDto } from '../../../api/types'

interface FabricDialogProps {
  isOpen: boolean
  onClose: () => void
  editing?: Fabric
}

const EMPTY: CreateFabricDto = { name: '', supplier: '', composition: '', construction: '', owner: 'CLO' }

export const FabricDialog = ({ isOpen, onClose, editing }: FabricDialogProps) => {
  const [form, setForm] = useState<CreateFabricDto>(EMPTY)
  const createMutation = useCreateFabric()
  const updateMutation = useUpdateFabric()

  useEffect(() => {
    if (isOpen) {
      setForm(
        editing
          ? {
              name: editing.name,
              supplier: editing.supplier ?? '',
              composition: editing.composition ?? '',
              construction: editing.construction ?? '',
              owner: editing.owner ?? 'CLO',
              price: editing.price,
            }
          : EMPTY
      )
    }
  }, [isOpen, editing])

  const set = (key: keyof CreateFabricDto) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const setPrice = (key: 'amount' | 'currency' | 'unit') => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({
      ...prev,
      price: {
        amount: key === 'amount' ? Number(e.target.value || 0) : prev.price?.amount ?? 0,
        currency: key === 'currency' ? e.target.value : prev.price?.currency ?? 'USD',
        unit: key === 'unit' ? e.target.value : prev.price?.unit ?? 'yd',
      },
    }))

  const handleSubmit = async () => {
    if (!form.name.trim()) return
    if (editing) {
      await updateMutation.mutateAsync({ id: editing.id, dto: form })
    } else {
      await createMutation.mutateAsync(form)
    }
    onClose()
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog isOpen={isOpen} onClose={onClose} closeOnOverlayClick>
      <DialogTitle>{editing ? 'Edit Fabric' : 'New Fabric'}</DialogTitle>
      <DialogContent>
        <FormGrid>
          <FormFieldFull>
            <FieldLabel>Name *</FieldLabel>
            <Textfield value={form.name} onChange={set('name')} placeholder="e.g. Organic Cotton Jersey" variant="outline" size="m" />
          </FormFieldFull>
          <FormField>
            <FieldLabel>Composition</FieldLabel>
            <Textfield value={form.composition ?? ''} onChange={set('composition')} placeholder="e.g. 100% Cotton" variant="outline" size="m" />
          </FormField>
          <FormField>
            <FieldLabel>Construction</FieldLabel>
            <Textfield value={form.construction ?? ''} onChange={set('construction')} placeholder="e.g. Jersey" variant="outline" size="m" />
          </FormField>
          <FormField>
            <FieldLabel>Supplier</FieldLabel>
            <Textfield value={form.supplier ?? ''} onChange={set('supplier')} placeholder="e.g. Textil Corp" variant="outline" size="m" />
          </FormField>
          <FormField>
            <FieldLabel>Owner</FieldLabel>
            <Textfield value={form.owner ?? ''} onChange={set('owner')} placeholder="e.g. CLO" variant="outline" size="m" />
          </FormField>
          <FormField>
            <FieldLabel>Price</FieldLabel>
            <Textfield value={form.price?.amount?.toString() ?? ''} onChange={setPrice('amount')} placeholder="4.50" variant="outline" size="m" type="number" />
          </FormField>
          <FormField>
            <FieldLabel>Currency</FieldLabel>
            <Textfield value={form.price?.currency ?? 'USD'} onChange={setPrice('currency')} placeholder="USD" variant="outline" size="m" />
          </FormField>
          <FormField>
            <FieldLabel>Unit</FieldLabel>
            <Textfield value={form.price?.unit ?? 'yd'} onChange={setPrice('unit')} placeholder="yd" variant="outline" size="m" />
          </FormField>
        </FormGrid>
        {!form.name.trim() && <Typography typoName="Normal/Body/4/Normal" style={{ color: 'red' }}>Name is required.</Typography>}
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
