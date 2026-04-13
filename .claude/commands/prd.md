# Integrated Material Platform — PRD Reference

This skill loads the full PRD context for the Integrated Material Platform project.
Use this at the start of any session to ground Claude in the product vision, scope, and priorities.

---

## 1. 제품 한 줄 정의

패션 원부자재 검색, 라이브러리 관리, 시각 탐색, Article별 BOM 원가 계산을 한 곳에서 처리하는 내부 운영 플랫폼.

---

## 2. 제품 비전

패션 브랜드 및 의류 개발 조직이 원단, 소재, 부자재, 아티클, BOM 정보를 한 곳에서 검색하고 탐색하며 원가까지 검토할 수 있는 내부 운영 플랫폼.

3가지 역할:
- 데이터 사전 기반 검색 시스템
- 원부자재 및 스타일 구성요소 라이브러리
- 아티클 단위 원가 검토 및 BOM 운영 도구

---

## 3. 핵심 엔티티

`Style`, `Article`, `Item`, `ArticleBOM`, `Fabric`, `Material`, `MaterialTexture`, `Trim`, `Button`, `ButtonHole`, `Zipper`, `Graphic`, `TopStitch`, `SubTopStitch`, `PhysicalPropertyType`

---

## 4. 제품 4개 모듈

| 모듈 | 설명 |
|------|------|
| **Dictionary Search** | 엔티티·속성·설명·예시값 통합 검색 |
| **Library** | Fabric, Material, Trim, Button, Zipper, Graphic 카드형 관리 |
| **Explorer** | Material·Texture·Color·Finish 시각 탐색, BaseColor 스와치, Roughness/Metalness/Opacity 필터 |
| **Costing** | Article 선택 → BOM 조회 → `row_cost = item_unit_price × consumption` → `article_total_cost = sum(row_cost)` |

---

## 5. 정보 구조 (메인 메뉴)

```
Search     → Entity Search / Property Search / Relationship View
Library    → Fabrics / Materials / Trims / Buttons / Zippers / Graphics
Explorer   → Material Explorer / Texture Explorer / Trim Explorer / Compare View
Costing    → Article Cost / BOM Detail / Cost Compare
Admin      → Master Data / Articles / BOM / Schema
```

---

## 6. MVP 범위

**포함:**
- 통합 검색
- Fabric / Material / Trim / Button / Zipper 라이브러리
- MaterialTexture 기반 프리뷰
- Item 기반 마스터 관리
- Article BOM 조회
- 기본 원가 계산

**제외 (MVP 이후):**
- 고급 통화 환산
- MOQ 최적화 계산
- 자동 대체재 추천 엔진
- 포토리얼 이미지 생성
- 외부 ERP/PLM 실시간 연동

---

## 7. MVP 성공 기준

- 사용자가 30초 이내 원하는 원부자재를 검색할 수 있다.
- Article 하나의 BOM 원가를 한 화면에서 계산할 수 있다.
- MaterialTexture 기반 시각 프리뷰가 동작한다.
- 관리자 사용자가 마스터 데이터를 생성/수정할 수 있다.
- 동일한 원부자재의 중복 등록 빈도를 줄일 수 있다.

---

## 8. 우선순위

| 단계 | 범위 |
|------|------|
| 1단계 | Dictionary Search, Library |
| 2단계 | Material and Trim Explorer |
| 3단계 | Article BOM Cost Calculator, BOM CRUD |
| 4단계 | 고급 관리자 기능, 추천·분석 기능 |

---

## 9. CRUD 범위 요약

**마스터 데이터:** Fabric, Material, MaterialTexture, Trim, Button, ButtonHole, Zipper, Graphic, TopStitch, SubTopStitch, PhysicalPropertyType, Item — 생성·수정·비활성화·상세 조회

**스타일/아티클:** Style, Article — 생성·컬러웨이·코드 관리

**BOM:** ArticleBOM — 행 추가·Item 교체·소요량 수정·비활성화

---

## 10. 기술 고려사항

- **가격 기준:** `Item`의 Decimal + PriceUnit 구조를 원가 계산 기준으로 사용. 상세 엔티티의 JSON Price는 참고용.
- **삭제 정책:** 물리 삭제 대신 `archive` / `inactive` 상태 관리 권장.
- **시각 자산:** `MaterialTexture` 출발점으로 사용. 추후 `ThumbnailPath`, `PreviewImagePath`, `SwatchImagePath` 필드 확장 고려.
- **미정의 참조 엔티티:** `Supplier`, `Group` — 추후 명시적 문서화 필요.

---

## 11. 주요 리스크

1. 실제 운영 데이터 부재 → 샘플 레코드 데이터 필요
2. 가격 해석 방식 혼재 → 계산 기준 명확화 필요
3. 시각 자산(썸네일) 부족 → 초반 Library 경험 약할 수 있음
4. 참조 무결성 정책 미정 → Item·ArticleBOM·Article·Style 간 운영 규칙 필요

---

## 12. 향후 확장

- 시즌별 사용 소재 분석 대시보드
- 대체 원부자재 추천 기능
- Cost simulation 시나리오 저장
- Style / Article별 사용 자산 네트워크 시각화
- Garment Detail Composer 연동
- Construction Spec Viewer 연동
