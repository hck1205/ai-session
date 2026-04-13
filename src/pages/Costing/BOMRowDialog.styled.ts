import styled from '@emotion/styled'
import { colors, radius, spacing } from '@clovirtualfashion/foundation'

export const DialogBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.m2};
`

export const IntroCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s2};
  padding: ${spacing.m2};
  border-radius: ${radius.r3};
  border: 1px solid ${colors.lightColors['Grayscale/Solid/G2']};
  background:
    radial-gradient(circle at top right, rgba(37, 99, 235, 0.1), transparent 34%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.96));
`

export const IntroEyebrow = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${colors.lightColors['Grayscale/Solid/G6']};
`

export const IntroText = styled.span`
  font-size: 13px;
  line-height: 1.55;
  color: ${colors.lightColors['Grayscale/Solid/G8']};
`

export const PreviewCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s2};
  padding: ${spacing.m2};
  border-radius: ${radius.r3};
  border: 1px solid ${colors.lightColors['Grayscale/Solid/G2']};
  background: ${colors.lightColors['Grayscale/Solid/G0']};
`

export const PreviewTitle = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${colors.lightColors['Grayscale/Solid/G10']};
`

export const PreviewMeta = styled.span`
  font-size: 12px;
  color: ${colors.lightColors['Grayscale/Solid/G6']};
`

export const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${spacing.s2};
`

export const PreviewStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: ${spacing.s2};
  border-radius: ${radius.r2};
  background: ${colors.lightColors['Grayscale/Solid/G1']};
`

export const PreviewLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${colors.lightColors['Grayscale/Solid/G5']};
`

export const PreviewValue = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${colors.lightColors['Grayscale/Solid/G9']};
  white-space: nowrap;
`
