import { useMemo } from 'react'
import { Typography } from '@clovirtualfashion/components'
import { SideNavigation } from '@clovirtualfashion/components'
import type { SideNavigationMenu, SideNavigationClickHandler } from '@clovirtualfashion/components'
import { Root, SidebarShell, BrandBlock, BrandEyebrow, BrandMeta, Main, Content } from './AppLayout.styled'
import type { AppLayoutProps, AppPage } from './AppLayout.types'

const NAV_MENU: SideNavigationMenu = [
  {
    navigationList: [
      { key: 'library',  name: 'Library',  path: '/library' },
      { key: 'explorer', name: 'Explorer', path: '/explorer' },
      { key: 'costing',  name: 'Costing',  path: '/costing' },
      { key: 'about',    name: 'About',    path: '/about' },
    ],
  },
]

export const AppLayout = ({ activePage, onNavigate, children }: AppLayoutProps) => {
  const handleNavClick: SideNavigationClickHandler = useMemo(
    () =>
      ({ key }) => onNavigate(key as AppPage),
    [onNavigate]
  )

  return (
    <Root>
      <SidebarShell>
        <BrandBlock>
          <BrandEyebrow>Material Workspace</BrandEyebrow>
          <Typography typoName="Normal/Body/2/Bold">Sample Room</Typography>
          <BrandMeta>Library curation, material exploration, and costing in one workspace.</BrandMeta>
        </BrandBlock>
        <SideNavigation
          type="line"
          width={220}
          sideNavigationMenu={NAV_MENU}
          activeKey={activePage}
          onSideMenuClick={handleNavClick}
        />
      </SidebarShell>
      <Main>
        <Content>{children}</Content>
      </Main>
    </Root>
  )
}
