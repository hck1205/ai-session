import styled from '@emotion/styled'
import { colors, spacing, radius } from '@clovirtualfashion/foundation'

export const Root = styled.div<{ isInteractive: boolean; accentColor?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${spacing.s2};
  padding: ${spacing.m2};
  border-radius: ${radius.r3};
  border: 1px solid ${colors.lightColors['Grayscale/Solid/G2']};
  background:
    radial-gradient(circle at top right, ${({ accentColor }) => accentColor ? `${accentColor}14` : 'rgba(255,255,255,0.75)'} 0%, transparent 28%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.96));
  cursor: ${({ isInteractive }) => (isInteractive ? 'pointer' : 'default')};
  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease, background 160ms ease;
  overflow: hidden;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.04);

  ${({ accentColor }) => accentColor && `
    border-left: 3px solid ${accentColor};
    padding-left: calc(${spacing.m2} - 2px);
  `}

  ${({ isInteractive }) =>
    isInteractive &&
    `&:hover {
      border-color: ${colors.lightColors['Grayscale/Solid/G4']};
      box-shadow: 0 20px 36px rgba(15, 23, 42, 0.10);
      transform: translateY(-3px);
    }`}

  &:hover .card-actions {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    inset: auto 0 0 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.35), transparent);
  }
`

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${spacing.s1};
`

export const TitleArea = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.s1};
  min-width: 0;
  flex: 1;
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s1};
`

export const MetaText = styled.span`
  font-size: 12px;
  color: ${colors.lightColors['Grayscale/Solid/G6']};
  line-height: 1.45;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const PriceText = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.lightColors['Grayscale/Solid/G10']};
  margin-top: ${spacing.s1};
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  opacity: 0;
  transition: opacity 160ms ease;
  flex-shrink: 0;
`
