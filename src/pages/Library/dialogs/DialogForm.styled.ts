import styled from '@emotion/styled'
import { spacing, colors, radius } from '@clovirtualfashion/foundation'

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.m2} ${spacing.m3};
  padding: ${spacing.m2} 0;
`

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s1};
`

export const FormFieldFull = styled(FormField)`
  grid-column: 1 / -1;
`

export const FieldLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.lightColors['Grayscale/Solid/G7']};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`

export const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${spacing.s3};
  padding-top: ${spacing.s3};
`

export const ColorPreview = styled.div<{ color: string }>`
  width: 24px;
  height: 24px;
  border-radius: ${radius.r1};
  background: ${({ color }) => color};
  border: 1px solid ${colors.lightColors['Grayscale/Solid/G3']};
  flex-shrink: 0;
`
