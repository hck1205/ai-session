import styled from '@emotion/styled'
import { colors, spacing, radius } from '@clovirtualfashion/foundation'

export const Root = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s2};
  padding: ${spacing.m2};
  border-radius: ${radius.r3};
  border: 1.5px solid ${({ selected }) => selected ? '#1d4ed8' : colors.lightColors['Grayscale/Solid/G2']};
  background:
    radial-gradient(circle at top right, ${({ selected }) => selected ? 'rgba(37, 99, 235, 0.14)' : 'rgba(15, 118, 110, 0.06)'} 0%, transparent 32%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.96));
  cursor: pointer;
  transition: border-color 150ms ease, transform 150ms ease, box-shadow 150ms ease;
  box-shadow: ${({ selected }) => selected ? '0 20px 40px rgba(29, 78, 216, 0.14)' : '0 10px 24px rgba(15, 23, 42, 0.05)'};

  &:hover {
    border-color: ${({ selected }) => selected ? '#1d4ed8' : colors.lightColors['Grayscale/Solid/G5']};
    transform: translateY(-2px);
    box-shadow: 0 20px 38px rgba(15, 23, 42, 0.09);
  }
`

export const SwatchRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.s2};
`

export const Attrs = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s1};
  padding-top: ${spacing.xs4};
`

export const AttrRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${spacing.s2};
`

export const AttrLabel = styled.span`
  font-size: 11px;
  color: ${colors.lightColors['Grayscale/Solid/G5']};
`

export const AttrValue = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${colors.lightColors['Grayscale/Solid/G8']};
  min-width: 38px;
  text-align: right;
`

export const BarTrack = styled.div`
  flex: 1;
  height: 6px;
  background: ${colors.lightColors['Grayscale/Solid/G2']};
  border-radius: ${radius.full};
  margin: 0 ${spacing.s1};
  overflow: hidden;
`

export const BarFill = styled.div<{ pct: number }>`
  height: 100%;
  width: ${({ pct }) => pct}%;
  background: linear-gradient(90deg, #0f766e, #1d4ed8);
  border-radius: ${radius.full};
`
