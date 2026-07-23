import { Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { DirectPage } from './pages/DirectPage'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { TaxiPage } from './pages/TaxiPage'
import { ReelsPage } from './pages/ReelsPage'
import { NewsArticlePage } from './pages/NewsArticlePage'
import { DesktopHomePage } from './pages/DesktopHomePage'
import { MainPage } from './pages/MainPage'
import { ModeSelectionPage } from './pages/ModeSelectionPage'
import { SearchPage } from './pages/SearchPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<ModeSelectionPage />} />
        <Route path="feed" element={<HomePage />} />
        <Route path="reels" element={<ReelsPage />} />
        <Route path="direct" element={<DirectPage />} />
        <Route path="telegram" element={<MainPage />} />
        <Route path="desktop" element={<DesktopHomePage />} />
        <Route path="desktop/telegram" element={<MainPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="taxi" element={<TaxiPage />} />
        <Route path="news" element={<NewsArticlePage />} />
      </Route>
    </Routes>
  )
}

export default App
