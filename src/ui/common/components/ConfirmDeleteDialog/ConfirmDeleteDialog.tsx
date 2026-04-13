import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@clovirtualfashion/components'

interface ConfirmDeleteDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  itemName?: string
  isLoading?: boolean
}

export const ConfirmDeleteDialog = ({ isOpen, onClose, onConfirm, itemName, isLoading }: ConfirmDeleteDialogProps) => (
  <Dialog isOpen={isOpen} onClose={onClose} closeOnOverlayClick>
    <DialogTitle>Delete {itemName ? `"${itemName}"` : 'item'}?</DialogTitle>
    <DialogContent>
      <Typography typoName="Normal/Body/3/Normal">
        This action cannot be undone. The item will be permanently removed from the library.
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button styleType="mono" variant="outlined" size="m" onClick={onClose}>Cancel</Button>
      <Button styleType="warning" variant="solid" size="m" onClick={onConfirm} isLoading={isLoading}>Delete</Button>
    </DialogActions>
  </Dialog>
)
