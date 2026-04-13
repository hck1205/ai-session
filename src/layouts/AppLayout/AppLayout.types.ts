export type AppPage = 'about' | 'library' | 'explorer' | 'costing'

export interface AppLayoutProps {
  activePage: AppPage
  onNavigate: (page: AppPage) => void
  children: React.ReactNode
}
