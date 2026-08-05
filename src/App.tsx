import type { ComponentType } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { DirectPage } from './pages/DirectPage'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { TaxiPage } from './pages/TaxiPage'
import { ReelsPage } from './pages/ReelsPage'
import { EnskyVestnikPage } from './pages/EnskyVestnikPage'
import { DesktopHomePage } from './pages/DesktopHomePage'
import { MainPage } from './pages/MainPage'
import { ModeSelectionPage } from './pages/ModeSelectionPage'
import { SearchPage } from './pages/SearchPage'

const instagramRoutes: Array<{ path: string; element: ComponentType }> = [
  { path: 'feed', element: HomePage },
  { path: 'reels', element: ReelsPage },
  { path: 'direct', element: DirectPage },
  { path: 'search', element: SearchPage },
  { path: 'profile', element: ProfilePage },
  { path: 'desktop', element: DesktopHomePage },
]

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<ModeSelectionPage />} />
        {instagramRoutes.map(({ path, element: Page }) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
        {instagramRoutes.map(({ path, element: Page }) => (
          <Route key={`vika-${path}`} path={`vika/${path}`} element={<Page />} />
        ))}
        <Route path="telegram" element={<MainPage />} />
        <Route path="desktop/telegram" element={<MainPage />} />
        <Route path="taxi" element={<TaxiPage />} />
        <Route path="news" element={<EnskyVestnikPage />} />
      </Route>
    </Routes>
  )
}

export default App
