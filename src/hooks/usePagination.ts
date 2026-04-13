import { useState, useCallback } from 'react'

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
