import { memo, useCallback } from 'react'
import { Typography, LabelBadge } from '@clovirtualfashion/components'
import { SwatchDot } from '../../atoms/SwatchDot'
import { Root, SwatchRow, Attrs, AttrRow, AttrLabel, AttrValue, BarTrack, BarFill } from './MaterialExplorerCard.styled'
import type { MaterialExplorerCardProps } from './MaterialExplorerCard.types'

/**
 * Material 시각 탐색 카드.
 * BaseColor 스와치, Roughness/Metalness/Opacity 바를 표시한다.
 * @memo 목록 리렌더 방지
 */
export const MaterialExplorerCard = memo(({ material, onClick, selected = false, className }: MaterialExplorerCardProps) => {
  const handleClick = useCallback(() => onClick?.(material.id), [material.id, onClick])

  return (
    <Root selected={selected} onClick={handleClick} className={className}>
      <SwatchRow>
        {material.baseColor && <SwatchDot rgb={material.baseColor} size={32} />}
        <div>
          <Typography typoName="Normal/Body/3/Bold">{material.baseColorName ?? '—'}</Typography>
          {material.shadingType && (
            <LabelBadge text={material.shadingType} color="gray" variant="stroke" size="s" />
          )}
        </div>
      </SwatchRow>
      <Attrs>
        {material.roughness !== undefined && (
          <AttrRow>
            <AttrLabel>Roughness</AttrLabel>
            <BarTrack><BarFill pct={material.roughness} /></BarTrack>
            <AttrValue>{material.roughness}%</AttrValue>
          </AttrRow>
        )}
        {material.metalness !== undefined && (
          <AttrRow>
            <AttrLabel>Metalness</AttrLabel>
            <BarTrack><BarFill pct={material.metalness} /></BarTrack>
            <AttrValue>{material.metalness}%</AttrValue>
          </AttrRow>
        )}
        {material.opacity !== undefined && (
          <AttrRow>
            <AttrLabel>Opacity</AttrLabel>
            <BarTrack><BarFill pct={material.opacity} /></BarTrack>
            <AttrValue>{material.opacity}%</AttrValue>
          </AttrRow>
        )}
      </Attrs>
    </Root>
  )
})

MaterialExplorerCard.displayName = 'MaterialExplorerCard'
