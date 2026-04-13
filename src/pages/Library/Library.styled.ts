import styled from '@emotion/styled'
import { colors, radius, spacing } from '@clovirtualfashion/foundation'

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.m3};
`

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${spacing.m2};
  flex-wrap: wrap;
`

export const HeaderCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs4};
`

export const HeaderMeta = styled.span`
  color: ${colors.lightColors['Grayscale/Solid/G6']};
  font-size: 13px;
`

export const ControlBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s3};
  padding: ${spacing.m2};
  border-radius: ${radius.r3};
  border: 1px solid ${colors.lightColors['Grayscale/Solid/G2']};
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.96)),
    ${colors.lightColors['Grayscale/Solid/G0']};
  box-shadow: 0 20px 48px rgba(15, 23, 42, 0.06);
`

export const TabList = styled.div`
  display: flex;
  gap: ${spacing.s2};
  flex-wrap: wrap;
`

export const TabButton = styled.button<{ isActive: boolean; accentColor: string }>`
  appearance: none;
  border: 1px solid ${({ isActive, accentColor }) =>
    isActive ? accentColor : colors.lightColors['Grayscale/Solid/G2']};
  background: ${({ isActive, accentColor }) =>
    isActive ? `${accentColor}14` : colors.lightColors['Grayscale/Solid/G0']};
  color: ${colors.lightColors['Grayscale/Solid/G9']};
  border-radius: ${radius.full};
  padding: ${spacing.s2} ${spacing.m1};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ accentColor }) => accentColor};
  }
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: ${spacing.m2};
`

export const SearchRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${spacing.s3};
  align-items: center;
  flex-wrap: wrap;
`

export const FiltersRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${spacing.s3};
  align-items: flex-end;
  flex-wrap: wrap;
`

export const FilterControls = styled.div`
  display: flex;
  gap: ${spacing.s3};
  flex-wrap: wrap;
  align-items: flex-end;
`

export const FilterField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs4};
`

export const FilterLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${colors.lightColors['Grayscale/Solid/G6']};
`

export const SearchMeta = styled.span<{ accentColor: string }>`
  color: ${colors.lightColors['Grayscale/Solid/G7']};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;

  &::before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 999px;
    margin-right: ${spacing.s2};
    vertical-align: middle;
    background: ${({ accentColor }) => accentColor};
    box-shadow: 0 0 0 4px ${({ accentColor }) => `${accentColor}20`};
  }
`
