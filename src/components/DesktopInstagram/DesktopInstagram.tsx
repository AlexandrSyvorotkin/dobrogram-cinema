import { Feed } from '../Feed/Feed'
import { StoriesBar } from '../Stories/StoriesBar'
import { DesktopInstagramNav } from './DesktopInstagramNav'
import { DesktopInstagramSuggestions } from './DesktopInstagramSuggestions'

export function DesktopInstagram() {
  return (
    <div className="min-h-dvh w-full bg-desktop-shell">
      <div className="mx-auto flex min-h-dvh w-full max-w-[975px] bg-white">
        <DesktopInstagramNav />

        <main className="w-full max-w-[470px] shrink-0 border-x border-[#f0f0f0] pt-8">
          <div className="sticky top-0 z-100 bg-white pb-3">
            <StoriesBar />
          </div>
          <Feed className="pb-8" />
        </main>

        <DesktopInstagramSuggestions />
      </div>
    </div>
  )
}
