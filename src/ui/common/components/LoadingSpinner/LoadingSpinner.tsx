import { Circular } from '@clovirtualfashion/components'
import { Root } from './LoadingSpinner.styled'

export const LoadingSpinner = () => (
  <Root>
    <Circular type="indeterminate" size="m" />
  </Root>
)
