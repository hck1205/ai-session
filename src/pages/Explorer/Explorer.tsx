import { Typography, RangeSlider } from '@clovirtualfashion/components'
import { MaterialExplorerCard } from '../../ui/molecules/MaterialExplorerCard'
import { SwatchDot } from '../../ui/atoms/SwatchDot'
import { LoadingSpinner } from '../../ui/common/components/LoadingSpinner'
import { EmptyState } from '../../ui/common/components/EmptyState'
import {
  Root, Grid, FilterRow, FilterGroup, FilterLabel,
  DetailPanel, DetailRow, DetailKey, DetailValue,
} from './Explorer.styled'
import { useExplorer } from './Explorer.hook'

export const Explorer = () => {
  const {
    filtered, isLoading, selectedId, setSelectedId, selectedMaterial,
    roughnessMin, setRoughnessMin, roughnessMax, setRoughnessMax,
    metalnessMin, setMetalnessMin, metalnessMax, setMetalnessMax,
    opacityMin, setOpacityMin, opacityMax, setOpacityMax,
  } = useExplorer()

  return (
    <Root>
      <Typography typoName="Normal/Headline/3/Bold">Material Explorer</Typography>

      <FilterRow>
        <FilterGroup>
          <FilterLabel>Roughness {roughnessMin}% - {roughnessMax}%</FilterLabel>
          <RangeSlider
            min={0} max={100} value={[roughnessMin, roughnessMax]}
            onChange={(vals) => {
              setRoughnessMin(vals[0])
              setRoughnessMax(vals[1])
            }}
          />
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>Metalness {metalnessMin}% - {metalnessMax}%</FilterLabel>
          <RangeSlider
            min={0} max={100} value={[metalnessMin, metalnessMax]}
            onChange={(vals) => {
              setMetalnessMin(vals[0])
              setMetalnessMax(vals[1])
            }}
          />
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>Opacity {opacityMin}% - {opacityMax}%</FilterLabel>
          <RangeSlider
            min={0} max={100} value={[opacityMin, opacityMax]}
            onChange={(vals) => {
              setOpacityMin(vals[0])
              setOpacityMax(vals[1])
            }}
          />
        </FilterGroup>
      </FilterRow>

      {isLoading ? (
        <LoadingSpinner />
      ) : filtered.length === 0 ? (
        <EmptyState description="No materials match the current filter settings." />
      ) : (
        <>
          <Grid>
            {filtered.map((m) => (
              <MaterialExplorerCard
                key={m.id}
                material={m}
                selected={m.id === selectedId}
                onClick={setSelectedId}
              />
            ))}
          </Grid>

          {selectedMaterial && (
            <DetailPanel>
              <Typography typoName="Normal/Subtitle/1/Bold">Material Detail</Typography>
              {selectedMaterial.baseColor && (
                <SwatchDot rgb={selectedMaterial.baseColor} size={48} />
              )}
              {[
                ['Color Name', selectedMaterial.baseColorName],
                ['Shading Type', selectedMaterial.shadingType],
                ['Source Type', selectedMaterial.sourceType],
                ['Texture Mapping', selectedMaterial.textureMapping],
                ['Roughness', selectedMaterial.roughness !== undefined ? `${selectedMaterial.roughness}%` : undefined],
                ['Metalness', selectedMaterial.metalness !== undefined ? `${selectedMaterial.metalness}%` : undefined],
                ['Opacity', selectedMaterial.opacity !== undefined ? `${selectedMaterial.opacity}%` : undefined],
                ['Reflection', selectedMaterial.reflectionIntensity !== undefined ? `${selectedMaterial.reflectionIntensity}%` : undefined],
                ['Target', selectedMaterial.target],
              ].filter(([, v]) => v !== undefined).map(([k, v]) => (
                <DetailRow key={k as string}>
                  <DetailKey>{k}</DetailKey>
                  <DetailValue>{v}</DetailValue>
                </DetailRow>
              ))}
            </DetailPanel>
          )}
        </>
      )}
    </Root>
  )
}
