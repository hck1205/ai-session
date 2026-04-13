export interface LibraryCardProps {
  id: string
  title: string
  subtitle?: string
  badge?: string
  meta?: string
  price?: string
  accentColor?: string
  onClick?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  className?: string
}
