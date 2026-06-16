import { Feed } from '../components/Feed/Feed'
import { Header } from '../components/Header/Header'
import { StoriesBar } from '../components/Stories/StoriesBar'

export function HomePage() {
  return (
    <>
      <div className="sticky top-0 z-100 bg-black">
        <Header />
        <StoriesBar />
      </div>
      <Feed />
    </>
  )
}
