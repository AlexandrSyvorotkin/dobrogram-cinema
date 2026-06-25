import { Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { DirectPage } from './pages/DirectPage'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { ReelsPage } from './pages/ReelsPage'
import { NewsArticlePage } from './pages/NewsArticlePage'
import { SearchPage } from './pages/SearchPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="reels" element={<ReelsPage />} />
        <Route path="direct" element={<DirectPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="news" element={<NewsArticlePage />} />
      </Route>
    </Routes>
  )
}

export default App
