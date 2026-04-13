import styled from '@emotion/styled'
import { colors, radius, spacing } from '@clovirtualfashion/foundation'

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.m3};
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${spacing.m2};
`

export const FilterRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: ${spacing.m1};
`

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s2};
  padding: ${spacing.m2};
  border-radius: ${radius.r3};
  border: 1px solid ${colors.lightColors['Grayscale/Solid/G2']};
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.98)),
    ${colors.lightColors['Grayscale/Solid/G0']};
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.05);
`

export const FilterLabel = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${colors.lightColors['Grayscale/Solid/G7']};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`

export const DetailPanel = styled.div`
  position: sticky;
  top: ${spacing.m3};
  align-self: flex-start;
  margin-left: auto;
  width: min(360px, 100%);
  background: ${colors.lightColors['Grayscale/Solid/G0']};
  border: 1px solid ${colors.lightColors['Grayscale/Solid/G2']};
  border-radius: ${radius.r3};
  padding: ${spacing.m3};
  display: flex;
  flex-direction: column;
  gap: ${spacing.m1};
  box-shadow: 0 22px 54px rgba(15, 23, 42, 0.08);
`

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${spacing.s2};
  padding: ${spacing.xs4} 0;
  border-bottom: 1px solid ${colors.lightColors['Grayscale/Solid/G1']};
`

export const DetailKey = styled.span`
  font-size: 12px;
  color: ${colors.lightColors['Grayscale/Solid/G5']};
`

export const DetailValue = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.lightColors['Grayscale/Solid/G9']};
  text-align: right;
`
