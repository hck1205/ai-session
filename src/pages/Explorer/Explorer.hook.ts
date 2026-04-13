import { useState, useMemo } from 'react'
import { useMaterials } from '../../queries'
import type { Material } from '../../api/types'

export const useExplorer = () => {
  const { data: materials = [], isLoading } = useMaterials()
  const [selectedId, setSelectedId] = useState<string | undefined>()
  const [roughnessMin, setRoughnessMin] = useState(0)
  const [roughnessMax, setRoughnessMax] = useState(100)
  const [metalnessMin, setMetalnessMin] = useState(0)
  const [metalnessMax, setMetalnessMax] = useState(100)
  const [opacityMin, setOpacityMin] = useState(0)
  const [opacityMax, setOpacityMax] = useState(100)

  /** Range sliders drive inclusive min/max material filters. */
  const filtered = useMemo(
    () =>
      materials.filter(
        (m: Material) =>
          (m.roughness ?? 0) >= roughnessMin &&
          (m.roughness ?? 0) <= roughnessMax &&
          (m.metalness ?? 0) >= metalnessMin &&
          (m.metalness ?? 0) <= metalnessMax &&
          (m.opacity ?? 0) >= opacityMin &&
          (m.opacity ?? 0) <= opacityMax
      ),
    [materials, roughnessMin, roughnessMax, metalnessMin, metalnessMax, opacityMin, opacityMax]
  )

  const selectedMaterial = useMemo(
    () => materials.find((m: Material) => m.id === selectedId),
    [materials, selectedId]
  )

  return {
    filtered,
    isLoading,
    selectedId,
    setSelectedId,
    selectedMaterial,
    roughnessMin,
    setRoughnessMin,
    roughnessMax,
    setRoughnessMax,
    metalnessMin,
    setMetalnessMin,
    metalnessMax,
    setMetalnessMax,
    opacityMin,
    setOpacityMin,
    opacityMax,
    setOpacityMax,
  }
}
