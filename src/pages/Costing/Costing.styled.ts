import styled from '@emotion/styled'
import { colors, spacing, radius } from '@clovirtualfashion/foundation'

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.m3};
`

export const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr repeat(3, minmax(140px, 1fr));
  gap: ${spacing.m2};

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
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
  font-size: 13px;
  color: ${colors.lightColors['Grayscale/Solid/G6']};
`

export const ControlCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.m2};
  padding: ${spacing.m2};
  border-radius: ${radius.r3};
  border: 1px solid ${colors.lightColors['Grayscale/Solid/G2']};
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(248, 250, 252, 0.98)),
    ${colors.lightColors['Grayscale/Solid/G0']};
  box-shadow: 0 20px 48px rgba(15, 23, 42, 0.06);
`

export const SelectorRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.m2};
  flex-wrap: wrap;
`

export const ArticleMeta = styled.div`
  display: flex;
  gap: ${spacing.s3};
  flex-wrap: wrap;
`

export const MetaChip = styled.span<{ accentColor?: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.s2};
  padding: 6px 10px;
  border-radius: ${radius.full};
  background: ${colors.lightColors['Grayscale/Solid/G1']};
  color: ${colors.lightColors['Grayscale/Solid/G8']};
  font-size: 12px;
  font-weight: 600;

  ${({ accentColor }) =>
    accentColor &&
    `
      &::before {
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 999px;
        background: ${accentColor};
        box-shadow: 0 0 0 4px ${accentColor}22;
      }
    `}
`

export const SummaryBox = styled.div`
  background:
    linear-gradient(135deg, rgba(37, 99, 235, 0.09), rgba(15, 118, 110, 0.06)),
    ${colors.lightColors['Grayscale/Solid/G0']};
  border: 1px solid ${colors.lightColors['Grayscale/Solid/G2']};
  border-radius: ${radius.r3};
  padding: ${spacing.m2} ${spacing.m3};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${spacing.m2};
  flex-wrap: wrap;
  min-height: 120px;
  box-shadow: 0 20px 44px rgba(15, 23, 42, 0.06);
`

export const SummaryMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs4};
`

export const TotalLabel = styled.span`
  font-size: 14px;
  color: ${colors.lightColors['Grayscale/Solid/G6']};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
`

export const TotalValue = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: ${colors.lightColors['Grayscale/Solid/G10']};
`

export const SummaryCaption = styled.span`
  font-size: 12px;
  color: ${colors.lightColors['Grayscale/Solid/G6']};
`

export const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${spacing.s2};
  padding: ${spacing.m2};
  border-radius: ${radius.r3};
  border: 1px solid ${colors.lightColors['Grayscale/Solid/G2']};
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95)),
    ${colors.lightColors['Grayscale/Solid/G0']};
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.05);
`

export const StatLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${colors.lightColors['Grayscale/Solid/G6']};
`

export const StatValue = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: ${colors.lightColors['Grayscale/Solid/G10']};
`

export const StatHint = styled.span`
  font-size: 12px;
  color: ${colors.lightColors['Grayscale/Solid/G6']};
`

export const TableWrap = styled.div`
  border: 1px solid ${colors.lightColors['Grayscale/Solid/G2']};
  border-radius: ${radius.r3};
  overflow: hidden;
  background: ${colors.lightColors['Grayscale/Solid/G0']};
  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.05);
`

export const TableToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.m2};
  padding: ${spacing.m2};
  border-bottom: 1px solid ${colors.lightColors['Grayscale/Solid/G2']};
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.92)),
    ${colors.lightColors['Grayscale/Solid/G0']};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const ToolbarCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const ToolbarTitle = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.lightColors['Grayscale/Solid/G10']};
`

export const ToolbarMeta = styled.span`
  font-size: 12px;
  color: ${colors.lightColors['Grayscale/Solid/G6']};
`

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 56px minmax(180px, 2fr) minmax(90px, 1fr) minmax(110px, 120px) minmax(110px, 120px) minmax(110px, 120px) 64px;
  padding: ${spacing.s3} ${spacing.m2};
  background: ${colors.lightColors['Grayscale/Solid/G1']};
  border-bottom: 1px solid ${colors.lightColors['Grayscale/Solid/G2']};
  gap: ${spacing.s2};
`

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 56px minmax(180px, 2fr) minmax(90px, 1fr) minmax(110px, 120px) minmax(110px, 120px) minmax(110px, 120px) 64px;
  padding: ${spacing.s3} ${spacing.m2};
  border-bottom: 1px solid ${colors.lightColors['Grayscale/Solid/G1']};
  align-items: center;
  gap: ${spacing.s2};
  &:last-child { border-bottom: none; }
  &:hover { background: ${colors.lightColors['Grayscale/Solid/G1']}; }
`

export const ColHead = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.lightColors['Grayscale/Solid/G6']};
  white-space: nowrap;
`

export const ColCell = styled.span`
  font-size: 13px;
  color: ${colors.lightColors['Grayscale/Solid/G9']};
  white-space: nowrap;
`

export const NoCell = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${colors.lightColors['Grayscale/Solid/G6']};
  white-space: nowrap;
`

export const ItemCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const ItemTitle = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${colors.lightColors['Grayscale/Solid/G10']};
`

export const ItemMetaText = styled.span`
  font-size: 12px;
  color: ${colors.lightColors['Grayscale/Solid/G6']};
`

export const CostCell = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.lightColors['Grayscale/Solid/G10']};
  white-space: nowrap;
`

export const EmptyActionWrap = styled.div`
  display: flex;
  justify-content: center;
`
