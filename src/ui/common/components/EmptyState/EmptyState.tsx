import { Typography } from '@clovirtualfashion/components'
import { Root, Icon } from './EmptyState.styled'
import type { EmptyStateProps } from './EmptyState.types'

export const EmptyState = ({ title = 'No data available', description, className }: EmptyStateProps) => (
  <Root className={className}>
    <Icon>○</Icon>
    <Typography typoName="Normal/Body/3/Bold">{title}</Typography>
    {description && <Typography typoName="Normal/Body/4/Normal">{description}</Typography>}
  </Root>
)
