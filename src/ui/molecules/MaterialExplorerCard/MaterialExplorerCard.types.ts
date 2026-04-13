import type { Material } from '../../../api/types'

export interface MaterialExplorerCardProps {
  material: Material
  onClick?: (id: string) => void
  selected?: boolean
  className?: string
}
