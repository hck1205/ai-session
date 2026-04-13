import styled from '@emotion/styled'
import { colors, radius, spacing } from '@clovirtualfashion/foundation'

export const Root = styled.div`
  display: flex;
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(15, 118, 110, 0.08), transparent 28%),
    radial-gradient(circle at top right, rgba(37, 99, 235, 0.08), transparent 24%),
    ${colors.lightColors['Grayscale/Solid/G1']};

  @media (max-width: 960px) {
    flex-direction: column;
  }
`

export const SidebarShell = styled.aside`
  width: 284px;
  padding: ${spacing.m2};
  display: flex;
  flex-direction: column;
  gap: ${spacing.m2};
  border-right: 1px solid rgba(148, 163, 184, 0.18);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(248, 250, 252, 0.92)),
    ${colors.lightColors['Grayscale/Solid/G0']};
  backdrop-filter: blur(14px);

  @media (max-width: 960px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid rgba(148, 163, 184, 0.18);
  }

  & > div:last-of-type {
    border-radius: ${radius.r4};
    overflow: hidden;
    box-shadow: 0 16px 44px rgba(15, 23, 42, 0.08);
  }
`

export const BrandBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs4};
  padding: ${spacing.m2};
  border-radius: ${radius.r4};
  color: ${colors.lightColors['Grayscale/Solid/G0']};
  background:
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.18), transparent 30%),
    linear-gradient(145deg, #0f766e, #1d4ed8 78%);
  box-shadow: 0 18px 40px rgba(29, 78, 216, 0.18);
`

export const BrandEyebrow = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.82;
`

export const BrandMeta = styled.span`
  font-size: 12px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.78);
`

export const Main = styled.main`
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`

export const Content = styled.div`
  flex: 1;
  width: min(1280px, 100%);
  margin: 0 auto;
  padding: ${spacing.m3};

  @media (max-width: 768px) {
    padding: ${spacing.m2};
  }

  & > * {
    border-radius: ${radius.r4};
  }
`
