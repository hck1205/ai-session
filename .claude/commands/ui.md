# UI Component Conventions

This skill defines the UI component authoring rules for this project.
Apply these rules whenever writing or reviewing any UI code.

---

## 1. 패키지 우선순위

화면을 만들 때 아래 순서를 반드시 따른다.

```
1순위  @clovirtualfashion/components   — 공통 UI 컴포넌트 (Button, Input, Card 등)
2순위  @clovirtualfashion/foundation   — 토큰, 색상, 타이포그래피, 스페이싱 등 디자인 기반
3순위  emotion                         — 위 두 패키지에 없는 경우에만 직접 작성
```

> DS 패키지에 원하는 컴포넌트가 있으면 절대 직접 만들지 않는다.
> DS 컴포넌트를 래핑해서 확장이 필요하면 래퍼 컴포넌트를 만들어도 좋다.

---

## 2. Emotion 사용 규칙

DS에 없는 컴포넌트를 새로 작성할 때:

- `@emotion/styled` 또는 `@emotion/css` 사용
- 색상·스페이싱·타이포그래피 값은 반드시 `@clovirtualfashion/foundation` 토큰 참조
- 인라인 하드코딩 금지 (`color: '#333'` 같은 리터럴 값 사용 금지)

```tsx
// Good
import { colors, spacing } from '@clovirtualfashion/foundation'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  padding: ${spacing[4]};
  color: ${colors.gray[700]};
`

// Bad
const Wrapper = styled.div`
  padding: 16px;
  color: #333;
`
```

---

## 3. Atomic 패턴

컴포넌트는 아래 레이어로 분리한다.

```
src/ui/
  atoms/        — 최소 단위 (Badge, Tag, Avatar, Icon, Divider 등)
  molecules/    — atoms 조합 (SearchBar, FilterChip, PriceTag 등)
  organisms/    — molecules 조합 (MaterialCard, BOMRow, LibraryCatalog 등)
```

- 각 레이어는 자신보다 상위 레이어를 import하지 않는다.
- `organisms`는 도메인 맥락을 가질 수 있다. `atoms`·`molecules`는 도메인 무관하게 generic하게 유지한다.

---

## 4. Generic 설계 원칙

- Props는 특정 도메인 타입이 아닌 primitive 또는 generic 타입으로 정의한다.
- 컴포넌트 이름에 도메인명을 넣지 않는다 (`FabricCard` → `LibraryCard`).
- 변형(variant)·크기(size)·상태(state)는 prop으로 열어둔다.
- 스타일 오버라이드가 필요하면 `className` prop을 통과시킨다.

```tsx
// Good — generic
interface LibraryCardProps {
  title: string
  subtitle?: string
  imageUrl?: string
  badge?: string
  onClick?: () => void
  className?: string
}

// Bad — domain-coupled
interface FabricCardProps {
  fabric: Fabric
}
```

---

## 5. DS 래퍼 컴포넌트

DS 컴포넌트를 그대로 쓰기 어렵거나 프로젝트 전용 기본값이 필요한 경우 래퍼를 만든다.

- 위치: `src/ui/atoms/` 또는 `src/ui/molecules/`
- 파일명 컨벤션: DS 원본 이름 유지 (예: `Button.tsx` → DS Button을 래핑)
- 래퍼는 DS Props를 전부 pass-through하고, 추가 prop만 정의한다.

```tsx
// src/ui/atoms/Button.tsx
import { Button as DSButton, ButtonProps as DSButtonProps } from '@clovirtualfashion/components'

interface ButtonProps extends DSButtonProps {
  loading?: boolean
}

export const Button = ({ loading, children, disabled, ...rest }: ButtonProps) => (
  <DSButton disabled={disabled || loading} {...rest}>
    {loading ? <Spinner size="sm" /> : children}
  </DSButton>
)
```

---

## 6. 파일 구조 예시

```
src/ui/
  atoms/
    Badge.tsx
    Button.tsx          # DS Button 래퍼 (loading prop 추가)
    SwatchDot.tsx
    Tag.tsx
  molecules/
    FilterChip.tsx
    LibraryCard.tsx
    PriceTag.tsx
    SearchBar.tsx
  organisms/
    LibraryCatalog.tsx
    MaterialExplorer.tsx
    BOMTable.tsx
  index.ts              # 전체 re-export
```

---

## 요약 체크리스트

- [ ] DS 패키지에 컴포넌트 있는지 먼저 확인했는가?
- [ ] 없으면 emotion + foundation 토큰으로 작성했는가?
- [ ] 하드코딩 색상·스페이싱 없는가?
- [ ] `src/ui/` 하위 적절한 atomic 레이어에 위치했는가?
- [ ] Props가 generic하고 도메인 타입에 의존하지 않는가?
- [ ] `className` pass-through 열려 있는가?
