# Frontend Code Conventions

This skill defines all FE code conventions for this project.
Apply these rules whenever writing any React component, hook, query, or utility code.

---

## 1. 파일 구조 패턴

모든 컴포넌트는 동명의 폴더 아래 아래 파일들로 분리한다.

```
ComponentName/
  ComponentName.tsx         # JSX only — 로직 없음
  ComponentName.styled.ts   # emotion styled 컴포넌트
  ComponentName.types.ts    # Props, State, 내부 타입
  ComponentName.hook.ts     # 컴포넌트 전용 커스텀 훅
  ComponentName.utils.ts    # 순수 함수, 포맷터 등
  index.ts                  # public API re-export
```

각 파일이 필요 없으면 생성하지 않는다 (빈 파일 금지).

### index.ts 패턴

```ts
// ComponentName/index.ts
export { ComponentName } from './ComponentName'
export type { ComponentNameProps } from './ComponentName.types'
// 외부에 노출할 것만 export — hook, utils는 필요한 경우에만
```

### 폴더 트리 예시

```
src/
  ui/
    atoms/
      Badge/
        Badge.tsx
        Badge.styled.ts
        Badge.types.ts
        index.ts
    molecules/
      LibraryCard/
        LibraryCard.tsx
        LibraryCard.styled.ts
        LibraryCard.types.ts
        LibraryCard.hook.ts
        index.ts
    organisms/
      MaterialExplorer/
        MaterialExplorer.tsx
        MaterialExplorer.styled.ts
        MaterialExplorer.types.ts
        MaterialExplorer.hook.ts
        index.ts
    common/
      components/
        EmptyState/
          EmptyState.tsx
          EmptyState.styled.ts
          EmptyState.types.ts
          index.ts
        LoadingSpinner/
          ...
      utils/
        format/
          price.ts
          date.ts
          index.ts
        sort/
          ...
  queries/                  # TanStack Query + axios 통합 파일
    fabric.query.ts
    material.query.ts
    article.query.ts
    bom.query.ts
    index.ts
  hooks/                    # 전역 커스텀 훅
    useDebounce.ts
    usePagination.ts
    index.ts
```

---

## 2. Query 파일 — 한 파일에 모두

axios 호출, TanStack Query 정의, lazy 호출 함수를 **엔티티별 하나의 파일**에 모두 작성한다.

```ts
// src/queries/fabric.query.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fabricService } from '@/api/services/fabric.service'
import type { Fabric, CreateFabricDto, UpdateFabricDto } from '@/api/types'

// ─────────────────────────────────────────
// 1. Query Keys
// ─────────────────────────────────────────

/** Query key factory — 캐시 무효화 범위를 명시적으로 관리하기 위해 팩토리 패턴 사용 */
export const fabricKeys = {
  all:    () => ['fabrics'] as const,
  lists:  () => [...fabricKeys.all(), 'list'] as const,
  detail: (id: string) => [...fabricKeys.all(), 'detail', id] as const,
}

// ─────────────────────────────────────────
// 2. axios fetcher (TanStack Query 구현체)
// ─────────────────────────────────────────

/** 전체 목록 조회 — queryFn으로 직접 사용 가능 */
const fetchFabrics = (): Promise<Fabric[]> => fabricService.getAll()

/** 단건 조회 */
const fetchFabricById = (id: string): Promise<Fabric> => fabricService.getById(id)

/** 생성 */
const createFabric = (dto: CreateFabricDto): Promise<Fabric> => fabricService.create(dto)

/** 수정 */
const updateFabric = (id: string, dto: UpdateFabricDto): Promise<Fabric> =>
  fabricService.update(id, dto)

/** 삭제 */
const deleteFabric = (id: string): Promise<void> => fabricService.remove(id)

// ─────────────────────────────────────────
// 3. TanStack Query Hooks
// ─────────────────────────────────────────

/**
 * Fabric 목록 조회 훅
 * @param enabled - false 전달 시 lazy 호출 (검색 조건 미입력 상태 등)
 */
export const useFabrics = (enabled = true) =>
  useQuery({
    queryKey: fabricKeys.lists(),
    queryFn: fetchFabrics,
    enabled,
    staleTime: 1000 * 60 * 5, // 5분 — 목록은 자주 변하지 않으므로 stale 시간 확보
  })

/**
 * Fabric 단건 조회 훅
 * id가 없으면 자동으로 비활성화됨
 */
export const useFabric = (id: string | undefined) =>
  useQuery({
    queryKey: fabricKeys.detail(id ?? ''),
    queryFn: () => fetchFabricById(id!),
    enabled: !!id,
  })

/** Fabric 생성 훅 */
export const useCreateFabric = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createFabric,
    onSuccess: () => {
      // 목록 캐시 전체 무효화 — 신규 항목 반영
      queryClient.invalidateQueries({ queryKey: fabricKeys.lists() })
    },
  })
}

/** Fabric 수정 훅 */
export const useUpdateFabric = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateFabricDto }) => updateFabric(id, dto),
    onSuccess: (updated) => {
      // 수정된 단건만 캐시 업데이트 — 불필요한 목록 재조회 방지
      queryClient.setQueryData(fabricKeys.detail(updated.id), updated)
      queryClient.invalidateQueries({ queryKey: fabricKeys.lists() })
    },
  })
}

/** Fabric 삭제 훅 */
export const useDeleteFabric = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteFabric,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: fabricKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: fabricKeys.lists() })
    },
  })
}

// ─────────────────────────────────────────
// 4. Lazy 호출 함수 (이벤트 핸들러 등 비훅 컨텍스트용)
// ─────────────────────────────────────────

/**
 * 훅 외부(이벤트 핸들러, 유틸 등)에서 fabric을 직접 조회해야 할 때 사용.
 * React Query 캐시와 무관하게 axios를 직접 호출한다.
 *
 * @example
 * const handleExport = async () => {
 *   const fabrics = await lazyFetchFabrics()
 *   exportToCsv(fabrics)
 * }
 */
export const lazyFetchFabrics = fetchFabrics
export const lazyFetchFabricById = fetchFabricById
```

---

## 3. 컴포넌트 작성 규칙

### .tsx — JSX only

```tsx
// LibraryCard/LibraryCard.tsx
import { memo } from 'react'
import { useLibraryCard } from './LibraryCard.hook'
import { Root, Thumbnail, Title, Badge } from './LibraryCard.styled'
import type { LibraryCardProps } from './LibraryCard.types'

/**
 * 원부자재 라이브러리 카드 컴포넌트.
 * 이미지, 타이틀, 배지를 카드 형태로 표시한다.
 *
 * @memo 목록 렌더링에서 불필요한 리렌더 방지를 위해 memo 적용
 */
export const LibraryCard = memo(({ id, title, imageUrl, badge, onClick }: LibraryCardProps) => {
  const { handleClick, isSelected } = useLibraryCard({ id, onClick })

  return (
    <Root onClick={handleClick} isSelected={isSelected}>
      <Thumbnail src={imageUrl} alt={title} />
      <Title>{title}</Title>
      {badge && <Badge>{badge}</Badge>}
    </Root>
  )
})

LibraryCard.displayName = 'LibraryCard'
```

### .hook.ts — 컴포넌트 로직 분리

```ts
// LibraryCard/LibraryCard.hook.ts
import { useCallback } from 'react'
import type { LibraryCardHookParams } from './LibraryCard.types'

/**
 * LibraryCard 내부 상태 및 이벤트 로직.
 * 컴포넌트에서 로직을 분리해 테스트 가능성을 높인다.
 */
export const useLibraryCard = ({ id, onClick }: LibraryCardHookParams) => {
  /**
   * useCallback으로 감싸 onClick이 동일한 참조를 유지하게 함.
   * 부모 컴포넌트가 리렌더될 때 카드 전체가 리렌더되는 것을 방지.
   */
  const handleClick = useCallback(() => {
    onClick?.(id)
  }, [id, onClick])

  return { handleClick, isSelected: false }
}
```

### .styled.ts — emotion

```ts
// LibraryCard/LibraryCard.styled.ts
import styled from '@emotion/styled'
import { colors, spacing, radius } from '@clovirtualfashion/foundation'

interface RootProps { isSelected: boolean }

export const Root = styled.div<RootProps>`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
  padding: ${spacing[4]};
  border-radius: ${radius.md};
  border: 1.5px solid ${({ isSelected }) => isSelected ? colors.primary[500] : colors.gray[200]};
  cursor: pointer;
  transition: border-color 150ms ease;

  &:hover { border-color: ${colors.primary[300]}; }
`

export const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: ${radius.sm};
`

export const Title = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.gray[900]};
`

export const Badge = styled.span`
  font-size: 12px;
  color: ${colors.gray[500]};
`
```

### .types.ts — 타입 전용

```ts
// LibraryCard/LibraryCard.types.ts
export interface LibraryCardProps {
  id: string
  title: string
  imageUrl?: string
  badge?: string
  onClick?: (id: string) => void
  className?: string
}

export interface LibraryCardHookParams {
  id: string
  onClick?: (id: string) => void
}
```

---

## 4. 전역 훅 (hooks/)

```ts
// src/hooks/useDebounce.ts

/**
 * 값이 안정될 때까지 delay ms 동안 업데이트를 지연한다.
 * 검색 입력처럼 빠른 상태 변화가 API 호출로 이어지는 경우에 사용.
 *
 * @param value - 디바운스할 원본 값
 * @param delay - 지연 시간 (ms), 기본값 300
 */
export const useDebounce = <T>(value: T, delay = 300): T => {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}
```

```ts
// src/hooks/usePagination.ts

/**
 * 페이지네이션 상태와 핸들러를 관리한다.
 * 목록 UI에서 page / pageSize를 컴포넌트마다 중복 구현하지 않기 위해 분리.
 */
export const usePagination = (initialPageSize = 20) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const goTo = useCallback((next: number) => setPage(next), [])
  const reset = useCallback(() => setPage(1), [])

  return { page, pageSize, goTo, reset, setPageSize }
}
```

---

## 5. 공통 컴포넌트 및 유틸 (common/)

공통으로 2회 이상 쓰이는 로직이 발견되면 즉시 common으로 이동한다.

```
src/ui/common/
  components/
    EmptyState/          # 데이터 없음 상태
    LoadingSpinner/      # 로딩 인디케이터
    ErrorBoundary/       # 에러 경계
    ConfirmDialog/       # 삭제 확인 다이얼로그
  utils/
    format/
      price.ts           # { amount, currency, unit } → "USD 4.50 / yd"
      date.ts            # ISO 날짜 → 표시 문자열
      index.ts
    sort/
      byName.ts
      byPrice.ts
      index.ts
    filter/
      byItemType.ts
      index.ts
```

```ts
// src/ui/common/utils/format/price.ts

import type { PriceJson } from '@/api/types'

/**
 * PriceJson 객체를 사람이 읽기 좋은 문자열로 변환한다.
 * 백엔드 Price JSON 구조가 변경될 경우 이 함수만 수정하면 된다.
 *
 * @example formatPrice({ amount: 4.5, currency: 'USD', unit: 'yd' }) → "USD 4.50 / yd"
 */
export const formatPrice = (price: PriceJson | null | undefined): string => {
  if (!price) return '—'
  return `${price.currency} ${price.amount.toFixed(2)} / ${price.unit}`
}
```

---

## 6. 성능 원칙

| 상황 | 적용 방법 |
|------|-----------|
| 목록의 각 아이템 컴포넌트 | `memo()` 적용 |
| 이벤트 핸들러 | `useCallback` — deps 배열 최소화 |
| 계산 비용이 큰 파생값 | `useMemo` — primitive 결과는 사용 자제 |
| 검색 입력 → API 호출 | `useDebounce` 거친 후 쿼리 활성화 |
| 조건부 쿼리 | `enabled` 옵션으로 lazy 활성화 |
| 대형 목록 | `react-window` / `react-virtual` 가상화 검토 |
| 이미지 | `loading="lazy"` 기본 적용 |
| 라우트 단위 코드 분할 | `React.lazy` + `Suspense` |

---

## 7. JSDoc 작성 기준

아래 조건 중 하나라도 해당하면 JSDoc을 작성한다.

- 왜 이렇게 구현했는지 이유가 코드에서 명확히 드러나지 않을 때
- 성능을 위해 비자명한 선택을 했을 때 (memo, useCallback, staleTime 등)
- 공통 유틸 함수 (`@param`, `@example` 포함)
- 복잡한 파생 상태나 도메인 계산 로직

단순한 컴포넌트, 자명한 타입, 반복 패턴에는 JSDoc 생략.

```ts
/**
 * 한 줄 설명.
 * 필요 시 두 번째 줄에 why / 주의사항.
 *
 * @param paramName - 설명
 * @example
 * usage example
 */
```

---

## 8. 컴포넌트에서 API 호출 패턴

컴포넌트에서는 반드시 query 훅만 사용한다. axios, service, repository는 직접 import 금지.

```tsx
// FabricList.tsx — 올바른 패턴
import { useFabrics } from '@/queries/fabric.query'
import { useDebounce } from '@/hooks'

export const FabricList = () => {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)

  // 검색어가 2글자 이상일 때만 쿼리 활성화
  const { data, isLoading, isError } = useFabrics(debouncedSearch.length >= 2)

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorState />
  return <>{data?.map(f => <LibraryCard key={f.id} {...f} />)}</>
}
```

---

## 9. index.ts re-export 규칙

- 모든 폴더에 `index.ts` 작성
- 외부에 노출할 것만 export (내부 구현 타입, 스타일 컴포넌트는 export 생략)
- `export * from` 보다 named export 명시 선호 (tree-shaking 유리)

```ts
// queries/index.ts
export { fabricKeys, useFabrics, useFabric, useCreateFabric, useUpdateFabric, useDeleteFabric, lazyFetchFabrics } from './fabric.query'
export { materialKeys, useMaterials, useMaterial, useCreateMaterial } from './material.query'
// ...
```

---

## 10. 네이밍 컨벤션

| 대상 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 | PascalCase | `LibraryCard` |
| 훅 | `use` + PascalCase | `useLibraryCard`, `useFabrics` |
| Query key factory | camelCase + `Keys` | `fabricKeys` |
| 유틸 함수 | camelCase | `formatPrice` |
| 타입/인터페이스 | PascalCase | `LibraryCardProps` |
| styled 컴포넌트 | PascalCase (의미 기반) | `Root`, `Thumbnail`, `Title` |
| 상수 | UPPER_SNAKE_CASE | `STALE_TIME_5M` |
| 파일 | 컴포넌트명과 동일 | `LibraryCard.tsx` |

---

## 체크리스트

- [ ] 폴더 구조: `{Name}/Name.tsx`, `Name.styled.ts`, `Name.types.ts`, `Name.hook.ts`, `index.ts`
- [ ] 컴포넌트에서 로직은 `.hook.ts`로 분리했는가?
- [ ] query 파일에 key factory, fetcher, hook, lazy 함수가 모두 있는가?
- [ ] 컴포넌트에서 axios / service를 직접 import하지 않았는가?
- [ ] 목록 아이템 컴포넌트에 `memo` 적용했는가?
- [ ] 이벤트 핸들러에 `useCallback` 적용했는가?
- [ ] 검색 입력에 `useDebounce` 거쳤는가?
- [ ] 공통 로직이 2회 이상 반복되면 `common/`으로 이동했는가?
- [ ] 비자명한 코드에 JSDoc 작성했는가?
- [ ] 모든 폴더에 `index.ts` 작성했는가?
