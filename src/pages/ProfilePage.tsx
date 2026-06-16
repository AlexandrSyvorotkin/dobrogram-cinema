import { feedPosts } from '../data/feedPosts'
import { user } from '../data/mockData'
import { IconVerified } from '../components/icons/Icons'

export function ProfilePage() {
  return (
    <main className="flex-1 pb-[90px]">
      <div className="px-4 pt-4">
        <div className="mb-4 flex items-center gap-4">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full">
            <img src={user.avatar} alt="" className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-lg font-semibold text-white">{user.username}</span>
              <IconVerified />
            </div>
            <p className="mt-1 text-sm text-[#a8a8a8]">{feedPosts.length} публикаций</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl">
          <img src={user.avatar} alt="" className="w-full object-cover" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-0.5">
        {feedPosts.map((post) => (
          <div key={post.id} className="aspect-square overflow-hidden bg-[#262626]">
            <img src={post.image} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </main>
  )
}
