import { Dot } from './SwatchDot.styled'
import type { SwatchDotProps } from './SwatchDot.types'

export const SwatchDot = ({ rgb, size = 24, className }: SwatchDotProps) => (
  <Dot rgb={rgb} size={size} className={className} />
)
