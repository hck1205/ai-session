import { useState, useEffect } from 'react'

/**
 * 값이 안정될 때까지 delay ms 동안 업데이트를 지연한다.
 * 검색 입력처럼 빠른 상태 변화가 API 호출로 이어지는 경우에 사용.
 */
export const useDebounce = <T>(value: T, delay = 300): T => {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}
