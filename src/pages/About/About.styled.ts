import styled from '@emotion/styled'
import { colors, radius, spacing } from '@clovirtualfashion/foundation'

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.m3};
`

export const Hero = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s2};
  padding: ${spacing.m3};
  border-radius: ${radius.r4};
  border: 1px solid ${colors.lightColors['Grayscale/Solid/G2']};
  background:
    radial-gradient(circle at top right, rgba(37, 99, 235, 0.12), transparent 28%),
    radial-gradient(circle at top left, rgba(15, 118, 110, 0.1), transparent 24%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.96));
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.06);
`

export const HeroMeta = styled.span`
  max-width: 800px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  color: ${colors.lightColors['Grayscale/Solid/G7']};
`

export const ToggleRow = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const ToggleGroup = styled.div`
  display: inline-flex;
  padding: 4px;
  border-radius: ${radius.full};
  border: 1px solid ${colors.lightColors['Grayscale/Solid/G2']};
  background: ${colors.lightColors['Grayscale/Solid/G0']};
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.04);
`

export const ToggleButton = styled.button<{ isActive: boolean }>`
  appearance: none;
  border: none;
  background: ${({ isActive }) => (isActive ? 'linear-gradient(135deg, rgba(15, 118, 110, 0.14), rgba(37, 99, 235, 0.12))' : 'transparent')};
  color: ${colors.lightColors['Grayscale/Solid/G9']};
  padding: 8px 14px;
  border-radius: ${radius.full};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  cursor: pointer;
`

export const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.m2};
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.m3};
  padding: ${spacing.m3};
  border-radius: ${radius.r3};
  border: 1px solid ${colors.lightColors['Grayscale/Solid/G2']};
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.96)),
    ${colors.lightColors['Grayscale/Solid/G0']};
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.05);
`

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s2};
  padding-left: calc(${spacing.m2} + 4px);
  color: ${colors.lightColors['Grayscale/Solid/G8']};
  font-size: 15px;
  font-weight: 500;
  line-height: 1.75;
`

export const BenefitList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${spacing.m2};
`

export const BenefitCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s2};
  padding: ${spacing.m3};
  border-radius: ${radius.r3};
  border: 1px solid ${colors.lightColors['Grayscale/Solid/G2']};
  background: ${colors.lightColors['Grayscale/Solid/G0']};
`
