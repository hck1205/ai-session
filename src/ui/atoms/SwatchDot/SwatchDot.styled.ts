import styled from '@emotion/styled'
import { radius } from '@clovirtualfashion/foundation'

export const Dot = styled.div<{ rgb: [number, number, number]; size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${radius.full};
  background-color: ${({ rgb }) => `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`};
  border: 1px solid rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
`
