# API / DB Design Conventions

This skill defines the API layer architecture, mock data strategy, and IndexedDB persistence rules for local development.
Apply these rules whenever writing any data-fetching, service, or repository code.

---

## 1. 데이터 스키마 소스

모든 엔티티 정의는 `/Users/matt/Workspace/clo/closet/data-dictionary/closet/entity/` 를 기준으로 한다.

### 핵심 엔티티 목록

| 엔티티 | 경로 | ItemType 값 |
|--------|------|-------------|
| Season | `Season/Season.md` | — |
| Style | `Style/Style.md` | — |
| Article | `Article/Article.md` | — |
| ArticleBOM | `BOM/ArticleBOM.md` | — |
| Item | `Item/Item.md` | 아래 타입들의 상위 |
| Fabric | `Fabric/Fabric.md` | `"Fabric"` |
| Graphic | `Graphic/Graphic.md` | `"Graphic"` |
| Button | `Button/Button.md` | `"Button"` |
| ButtonHole | `Button/ButtonHole.md` | `"ButtonHole"` |
| Trim | `Trim/Trim.md` | `"Trim"` |
| Zipper | `Zipper/Zipper.md` | `"Zipper"` |
| TopStitch | `TopStitch/TopStitch.md` | `"TopStitch"` |
| SubTopStitch | `TopStitch/SubTopStitch.md` | — |
| Material | `Material/Material.md` | — |
| MaterialTexture | `Material/MaterialTexture.md` | — |
| PhysicalPropertyType | `PhysicalProperty/PhysicalPropertyType.md` | — |

### 엔티티 관계

```
Season
  └─ Style (1:N)
      └─ Article (1:N)
          └─ ArticleBOM (1:N) ──> Item (polymorphic via DetailId + ItemType)
                                       ├─> Fabric → Material (Front/Back/Side)
                                       ├─> Graphic → Material
                                       ├─> Button → Material (Body)
                                       ├─> ButtonHole → Material
                                       ├─> Trim → Material
                                       ├─> Zipper → Material (×7 부위)
                                       └─> TopStitch → SubTopStitch → Material

Material
  └─ MaterialTexture (1:N, composite key: MaterialId + TextureType)

PhysicalPropertyType ──> Fabric (PhysicalTypeId)
```

---

## 2. 폴더 구조

```
src/
  api/
    client.ts              # axios 인스턴스 설정 (baseURL, interceptors)
    endpoints.ts           # 모든 엔드포인트 경로 상수 정의
    mock/
      handlers/            # 엔티티별 mock handler 함수
        season.handler.ts
        style.handler.ts
        article.handler.ts
        bom.handler.ts
        item.handler.ts
        fabric.handler.ts
        material.handler.ts
        materialTexture.handler.ts
        trim.handler.ts
        button.handler.ts
        zipper.handler.ts
        graphic.handler.ts
        topStitch.handler.ts
        physicalPropertyType.handler.ts
      seed/
        season.seed.ts
        style.seed.ts
        article.seed.ts
        bom.seed.ts
        item.seed.ts
        fabric.seed.ts
        material.seed.ts
        trim.seed.ts
        button.seed.ts
        zipper.seed.ts
        graphic.seed.ts
        topStitch.seed.ts
      index.ts             # mock 활성화 진입점 (adapter 주입)
    services/              # 실제 API 호출 함수 (handler 또는 real axios 호출)
      season.service.ts
      style.service.ts
      article.service.ts
      bom.service.ts
      item.service.ts
      fabric.service.ts
      material.service.ts
      trim.service.ts
      button.service.ts
      zipper.service.ts
      graphic.service.ts
      topStitch.service.ts
      physicalPropertyType.service.ts
    repositories/          # IndexedDB CRUD 추상화
      db.ts                # IndexedDB 초기화 및 store 정의
      season.repository.ts
      style.repository.ts
      article.repository.ts
      bom.repository.ts
      item.repository.ts
      fabric.repository.ts
      material.repository.ts
      trim.repository.ts
      button.repository.ts
      zipper.repository.ts
      graphic.repository.ts
      topStitch.repository.ts
      physicalPropertyType.repository.ts
    types/                 # 엔티티별 TypeScript 타입 정의
      season.types.ts
      style.types.ts
      article.types.ts
      bom.types.ts
      item.types.ts
      fabric.types.ts
      material.types.ts
      trim.types.ts
      button.types.ts
      zipper.types.ts
      graphic.types.ts
      topStitch.types.ts
      index.ts             # re-export
```

---

## 3. axios 클라이언트 설정

```ts
// src/api/client.ts
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use((config) => {
  // 인증 토큰 등 추후 여기서 주입
  return config
})

apiClient.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err),
)
```

---

## 4. 엔드포인트 상수

```ts
// src/api/endpoints.ts
export const ENDPOINTS = {
  season:              '/seasons',
  seasonById:          (id: string) => `/seasons/${id}`,

  style:               '/styles',
  styleById:           (id: string) => `/styles/${id}`,

  article:             '/articles',
  articleById:         (id: string) => `/articles/${id}`,
  articlesByStyle:     (styleId: string) => `/styles/${styleId}/articles`,

  bom:                 '/boms',
  bomById:             (id: string) => `/boms/${id}`,
  bomsByArticle:       (articleId: string) => `/articles/${articleId}/boms`,

  item:                '/items',
  itemById:            (id: string) => `/items/${id}`,

  fabric:              '/fabrics',
  fabricById:          (id: string) => `/fabrics/${id}`,

  material:            '/materials',
  materialById:        (id: string) => `/materials/${id}`,

  materialTexture:     '/material-textures',
  materialTextureByMaterial: (materialId: string) => `/materials/${materialId}/textures`,

  trim:                '/trims',
  trimById:            (id: string) => `/trims/${id}`,

  button:              '/buttons',
  buttonById:          (id: string) => `/buttons/${id}`,

  buttonHole:          '/button-holes',
  buttonHoleById:      (id: string) => `/button-holes/${id}`,

  zipper:              '/zippers',
  zipperById:          (id: string) => `/zippers/${id}`,

  graphic:             '/graphics',
  graphicById:         (id: string) => `/graphics/${id}`,

  topStitch:           '/top-stitches',
  topStitchById:       (id: string) => `/top-stitches/${id}`,

  subTopStitch:        '/sub-top-stitches',
  subTopStitchById:    (id: string) => `/sub-top-stitches/${id}`,
  subTopStitchesByTopStitch: (topStitchId: string) => `/top-stitches/${topStitchId}/sub-top-stitches`,

  physicalPropertyType:     '/physical-property-types',
  physicalPropertyTypeById: (id: string) => `/physical-property-types/${id}`,
} as const
```

---

## 5. Mock 아키텍처 — "Integration-Ready" 패턴

### 핵심 원칙

- 모든 서비스 함수는 `IS_MOCK` 환경 변수 하나로 mock ↔ real 전환.
- mock handler는 IndexedDB를 직접 호출 → 실제 CRUD가 동작.
- real 전환 시 handler 교체만으로 완료 (서비스 함수 시그니처 불변).

```ts
// src/api/mock/index.ts
export const IS_MOCK = import.meta.env.VITE_MOCK === 'true'
```

### 서비스 함수 패턴

```ts
// src/api/services/fabric.service.ts
import { IS_MOCK } from '../mock'
import { apiClient } from '../client'
import { ENDPOINTS } from '../endpoints'
import * as mockHandler from '../mock/handlers/fabric.handler'
import type { Fabric, CreateFabricDto, UpdateFabricDto } from '../types'

export const fabricService = {
  getAll: (): Promise<Fabric[]> =>
    IS_MOCK ? mockHandler.getAll() : apiClient.get(ENDPOINTS.fabric).then(r => r.data),

  getById: (id: string): Promise<Fabric> =>
    IS_MOCK ? mockHandler.getById(id) : apiClient.get(ENDPOINTS.fabricById(id)).then(r => r.data),

  create: (dto: CreateFabricDto): Promise<Fabric> =>
    IS_MOCK ? mockHandler.create(dto) : apiClient.post(ENDPOINTS.fabric, dto).then(r => r.data),

  update: (id: string, dto: UpdateFabricDto): Promise<Fabric> =>
    IS_MOCK ? mockHandler.update(id, dto) : apiClient.patch(ENDPOINTS.fabricById(id), dto).then(r => r.data),

  remove: (id: string): Promise<void> =>
    IS_MOCK ? mockHandler.remove(id) : apiClient.delete(ENDPOINTS.fabricById(id)).then(r => r.data),
}
```

---

## 6. IndexedDB 설정

```ts
// src/api/repositories/db.ts
import { openDB, type IDBPDatabase } from 'idb'

const DB_NAME = 'integrated-material-platform'
const DB_VERSION = 1

export type StoreNames =
  | 'seasons' | 'styles' | 'articles' | 'boms' | 'items'
  | 'fabrics' | 'materials' | 'materialTextures'
  | 'trims' | 'buttons' | 'buttonHoles' | 'zippers'
  | 'graphics' | 'topStitches' | 'subTopStitches'
  | 'physicalPropertyTypes'

let _db: IDBPDatabase | null = null

export const getDB = async (): Promise<IDBPDatabase> => {
  if (_db) return _db
  _db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const stores: StoreNames[] = [
        'seasons', 'styles', 'articles', 'boms', 'items',
        'fabrics', 'materials', 'materialTextures',
        'trims', 'buttons', 'buttonHoles', 'zippers',
        'graphics', 'topStitches', 'subTopStitches',
        'physicalPropertyTypes',
      ]
      for (const name of stores) {
        if (!db.objectStoreNames.contains(name)) {
          db.createObjectStore(name, { keyPath: 'id' })
        }
      }
      // composite key store (MaterialTexture)
      if (!db.objectStoreNames.contains('materialTextures')) {
        db.createObjectStore('materialTextures', { keyPath: ['materialId', 'textureType'] })
      }
    },
  })
  return _db
}
```

### Repository 패턴 (모든 엔티티 동일 구조)

```ts
// src/api/repositories/fabric.repository.ts
import { getDB } from './db'
import type { Fabric } from '../types'

const STORE = 'fabrics' as const

export const fabricRepository = {
  getAll: async (): Promise<Fabric[]> => {
    const db = await getDB()
    return db.getAll(STORE)
  },
  getById: async (id: string): Promise<Fabric | undefined> => {
    const db = await getDB()
    return db.get(STORE, id)
  },
  put: async (record: Fabric): Promise<void> => {
    const db = await getDB()
    await db.put(STORE, record)
  },
  delete: async (id: string): Promise<void> => {
    const db = await getDB()
    await db.delete(STORE, id)
  },
}
```

---

## 7. Mock Handler 패턴

```ts
// src/api/mock/handlers/fabric.handler.ts
import { fabricRepository } from '../../repositories/fabric.repository'
import type { Fabric, CreateFabricDto, UpdateFabricDto } from '../../types'
import { generateId } from '../../mock/utils'

export const getAll = (): Promise<Fabric[]> =>
  fabricRepository.getAll()

export const getById = async (id: string): Promise<Fabric> => {
  const item = await fabricRepository.getById(id)
  if (!item) throw new Error(`Fabric not found: ${id}`)
  return item
}

export const create = async (dto: CreateFabricDto): Promise<Fabric> => {
  const record: Fabric = { ...dto, id: generateId() }
  await fabricRepository.put(record)
  return record
}

export const update = async (id: string, dto: UpdateFabricDto): Promise<Fabric> => {
  const existing = await getById(id)
  const updated: Fabric = { ...existing, ...dto }
  await fabricRepository.put(updated)
  return updated
}

export const remove = async (id: string): Promise<void> => {
  await fabricRepository.delete(id)
}
```

---

## 8. Seed 데이터 규칙

- 각 seed 파일은 해당 엔티티의 mock 레코드 3~5개를 export
- seed는 앱 초기화 시 DB가 비어있을 때만 적재
- UUID는 고정값 사용 (관계 참조용)
- Price JSON 구조: `{ amount: number, currency: string, unit: string }`

```ts
// src/api/mock/seed/fabric.seed.ts
import type { Fabric } from '../../types'

export const fabricSeeds: Fabric[] = [
  {
    id: 'fabric-001',
    name: 'Organic Cotton Jersey',
    itemNo: 'FBR-001',
    construction: 'Jersey',
    composition: 'Cotton 100%',
    thickness: 0.5,
    width: 1500,
    cuttableWidth: 1480,
    supplier: 'Texco',
    owner: 'CLO',
    price: { amount: 4.5, currency: 'USD', unit: 'yd' },
    moq: 300,
    country: 'Korea',
    frontMaterialId: 'material-001',
    backMaterialId: 'material-002',
    weight: 180,
    friction: 0.3,
    // ... 기타 필드
  },
  // ...
]
```

### Seed 적재 진입점

```ts
// src/api/mock/index.ts
import { getDB } from '../repositories/db'
import { fabricSeeds } from './seed/fabric.seed'
import { materialSeeds } from './seed/material.seed'
// ... 모든 seed import

export const IS_MOCK = import.meta.env.VITE_MOCK === 'true'

export const initializeMockDB = async () => {
  if (!IS_MOCK) return
  const db = await getDB()

  // 비어있을 때만 seed 적재
  const fabricCount = await db.count('fabrics')
  if (fabricCount === 0) {
    for (const seed of fabricSeeds) await db.put('fabrics', seed)
  }
  // ... 나머지 엔티티 동일 패턴
}
```

---

## 9. 관심사 분리 요약

| 레이어 | 파일 위치 | 역할 |
|--------|-----------|------|
| **Types** | `api/types/*.types.ts` | 엔티티 인터페이스, DTO 타입 |
| **Endpoints** | `api/endpoints.ts` | URL 경로 상수 |
| **Client** | `api/client.ts` | axios 인스턴스, interceptor |
| **Repository** | `api/repositories/*.repository.ts` | IndexedDB CRUD 추상화 |
| **Mock Handler** | `api/mock/handlers/*.handler.ts` | repository 호출로 CRUD 구현 |
| **Seed** | `api/mock/seed/*.seed.ts` | 초기 mock 데이터 |
| **Service** | `api/services/*.service.ts` | IS_MOCK 분기, 단일 진입점 |

UI 레이어는 **service만 호출**한다. repository, handler, seed는 직접 import하지 않는다.

---

## 10. 환경 변수

```
# .env.local (로컬 mock 개발)
VITE_MOCK=true
VITE_API_BASE_URL=/api

# .env.production (실제 연동)
VITE_MOCK=false
VITE_API_BASE_URL=https://api.example.com
```

---

## 11. Real API 전환 체크리스트

mock → real 전환 시 변경 범위:

- [ ] `VITE_MOCK=false` 로 변경
- [ ] `VITE_API_BASE_URL` 을 실제 서버 주소로 변경
- [ ] `apiClient` interceptor에 인증 토큰 주입 추가
- [ ] 서비스 함수 시그니처 변경 없음
- [ ] UI 코드 변경 없음

---

## 12. 특수 케이스

### 12-1. Item 폴리모픽 참조

`Item.ItemType` 값에 따라 `DetailId`가 가리키는 엔티티가 다르다.
서비스 레이어에서 resolve:

```ts
// item.service.ts getWithDetail
const resolvers: Record<string, (id: string) => Promise<unknown>> = {
  Fabric:    (id) => fabricService.getById(id),
  Graphic:   (id) => graphicService.getById(id),
  Button:    (id) => buttonService.getById(id),
  ButtonHole:(id) => buttonHoleService.getById(id),
  Trim:      (id) => trimService.getById(id),
  Zipper:    (id) => zipperService.getById(id),
  TopStitch: (id) => topStitchService.getById(id),
}
```

### 12-2. MaterialTexture 복합키

IndexedDB store의 `keyPath: ['materialId', 'textureType']` 을 사용.
조회 시 `db.get('materialTextures', [materialId, textureType])` 형태로 호출.

### 12-3. 원가 계산

`ArticleBOM` 조회 후 클라이언트에서 계산:
```
row_cost = item.price × bom.consumption
article_total_cost = sum(row_cost)
```
별도 계산 API 불필요, 서비스 레이어에서 계산 후 반환.
