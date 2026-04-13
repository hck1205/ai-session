import styled from '@emotion/styled'
import { colors, radius, spacing } from '@clovirtualfashion/foundation'

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${spacing.s2};
  padding: ${spacing.xl2};
  color: ${colors.lightColors['Grayscale/Solid/G5']};
  text-align: center;
  border: 1px dashed ${colors.lightColors['Grayscale/Solid/G3']};
  border-radius: ${radius.r3};
  background:
    radial-gradient(circle at top, rgba(37, 99, 235, 0.08), transparent 36%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.92));
`

export const Icon = styled.div`
  font-size: 40px;
  opacity: 0.9;
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(15, 118, 110, 0.16), rgba(37, 99, 235, 0.14));
  color: ${colors.lightColors['Grayscale/Solid/G8']};
`
