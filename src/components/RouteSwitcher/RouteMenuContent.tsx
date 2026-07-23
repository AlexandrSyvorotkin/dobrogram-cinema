import { useNavigate } from 'react-router-dom'
import { appRouteOptions, isRouteActive } from '../../data/appRoutes'

type RouteMenuContentProps = {
  pathname: string
  onSelect?: () => void
}

export function RouteMenuContent({ pathname, onSelect }: RouteMenuContentProps) {
  const navigate = useNavigate()
  const phoneRoutes = appRouteOptions.filter((route) => route.device === 'phone')
  const desktopRoutes = appRouteOptions.filter((route) => route.device === 'desktop')

  const goTo = (path: string) => {
    navigate(path)
    onSelect?.()
  }

  return (
    <>
      <RouteGroup title="Телефон" routes={phoneRoutes} pathname={pathname} onSelect={goTo} />
      <RouteGroup title="Компьютер" routes={desktopRoutes} pathname={pathname} onSelect={goTo} />
    </>
  )
}

function RouteGroup({
  title,
  routes,
  pathname,
  onSelect,
}: {
  title: string
  routes: typeof appRouteOptions
  pathname: string
  onSelect: (path: string) => void
}) {
  return (
    <div className="mb-4 last:mb-0">
      <p className="mb-2 text-[12px] font-semibold tracking-wide text-[#8e8e8e] uppercase">{title}</p>
      <div className="space-y-2">
        {routes.map((route) => {
          const active = isRouteActive(pathname, route.path)

          return (
            <button
              key={route.id}
              type="button"
              onClick={() => onSelect(route.path)}
              className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                active
                  ? 'border-[#0095f6] bg-[#0095f6]/8'
                  : 'border-[#efefef] bg-[#fafafa] hover:bg-[#f4f4f5]'
              }`}
            >
              <span>
                <span className="block text-[16px] font-semibold text-black">{route.label}</span>
                <span className="mt-0.5 block text-[13px] text-[#707579]">{route.description}</span>
              </span>
              {active && (
                <span className="ml-3 shrink-0 text-[#0095f6]" aria-hidden="true">
                  ✓
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
