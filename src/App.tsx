import React, { useState, useCallback, useEffect } from 'react'
import { AppLayout, type AppPage } from './layouts/AppLayout'
import { About } from './pages/About'
import { Library } from './pages/Library'
import { Explorer } from './pages/Explorer'
import { Costing } from './pages/Costing'
import { initializeMockDB } from './api/mock'

const PAGE_MAP: Record<AppPage, React.ReactElement> = {
  about:    <About />,
  library:  <Library />,
  explorer: <Explorer />,
  costing:  <Costing />,
}

function App() {
  const [activePage, setActivePage] = useState<AppPage>('library')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    /** Mock DB seed 초기화 — 앱 마운트 시 한 번만 실행 */
    initializeMockDB().then(() => setReady(true))
  }, [])

  const handleNavigate = useCallback((page: AppPage) => setActivePage(page), [])

  if (!ready) return null

  return (
    <AppLayout activePage={activePage} onNavigate={handleNavigate}>
      {PAGE_MAP[activePage]}
    </AppLayout>
  )
}

export default App
