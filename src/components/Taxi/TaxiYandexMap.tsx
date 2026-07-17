import { useEffect, useRef, useState } from 'react'
import {
  buildMapRouteUrl,
  buildMapWidgetUrl,
  configureTaxiMap,
  getYandexMapsApiKey,
  hideYandexMapChrome,
  loadYandexMaps,
  TAXI_FALLBACK_POSITION,
  type TaxiMapRoute,
} from '../../lib/yandexMaps'

type TaxiYandexMapProps = {
  className?: string
  route?: TaxiMapRoute | null
}

function YandexMapWidget({
  position,
  route,
}: {
  position: [number, number]
  route?: TaxiMapRoute | null
}) {
  const iframeSrc = route
    ? buildMapRouteUrl(route.from, route.to)
    : buildMapWidgetUrl(position)

  return (
    <>
      <iframe
        key={iframeSrc}
        title="Карта"
        src={iframeSrc}
        className={`pointer-events-none absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 border-0 ${
          route ? 'h-full w-full' : 'h-[165%] w-[165%]'
        }`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-10 bg-linear-to-l from-[#ede8df] to-transparent" />
    </>
  )
}

function YandexMapJsApi({
  position,
  apiKey,
  route,
}: {
  position: [number, number]
  apiKey: string
  route?: TaxiMapRoute | null
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<ymaps.IMap | null>(null)
  const routeRef = useRef<ymaps.IGeoObject | null>(null)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    const container = mapContainerRef.current
    if (!container) return

    let cancelled = false
    const observer = new MutationObserver(() => hideYandexMapChrome(container))
    observer.observe(container, { childList: true, subtree: true })

    async function initMap() {
      try {
        const ymapsApi = await loadYandexMaps(apiKey)
        if (cancelled || !mapContainerRef.current) return

        const map = new ymapsApi.Map(
          mapContainerRef.current,
          {
            center: position,
            zoom: 16,
            controls: [],
            suppressMapOpenBlock: true,
          },
          {
            yandexMapDisablePoiInteractivity: true,
            suppressObsoleteBrowserNotifier: true,
          },
        )

        configureTaxiMap(map)
        hideYandexMapChrome(mapContainerRef.current)

        mapRef.current = map
        setMapReady(true)
      } catch {
        mapRef.current = null
        setMapReady(false)
      }
    }

    void initMap()

    return () => {
      cancelled = true
      observer.disconnect()
      setMapReady(false)
      routeRef.current = null
      mapRef.current?.destroy()
      mapRef.current = null
    }
  }, [apiKey, position])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapReady) return

    if (routeRef.current) {
      map.geoObjects.remove(routeRef.current)
      routeRef.current = null
    }

    if (!route) {
      map.setCenter(position, 16)
      return
    }

    void loadYandexMaps(apiKey).then((ymapsApi) => {
      const routerApi = ymapsApi as typeof ymapsApi & {
        multiRouter?: {
          MultiRoute: new (
            model: { referencePoints: [number, number][]; params: { routingMode: string } },
            options: { boundsAutoApply: boolean; wayPointVisible: boolean; routeActiveMarkerVisible: boolean },
          ) => ymaps.IGeoObject
        }
      }

      if (!routerApi.multiRouter || mapRef.current !== map) return

      const multiRoute = new routerApi.multiRouter.MultiRoute(
        {
          referencePoints: [route.from, route.to],
          params: { routingMode: 'auto' },
        },
        {
          boundsAutoApply: true,
          wayPointVisible: true,
          routeActiveMarkerVisible: false,
        },
      )

      map.geoObjects.add(multiRoute)
      routeRef.current = multiRoute
    })
  }, [apiKey, mapReady, position, route])

  return <div ref={mapContainerRef} className="absolute inset-0 h-full w-full" />
}

export function TaxiYandexMap({ className = '', route = null }: TaxiYandexMapProps) {
  const apiKey = getYandexMapsApiKey()

  return (
    <div className={`taxi-yandex-map absolute inset-0 overflow-hidden ${className}`}>
      {apiKey ? (
        <YandexMapJsApi position={TAXI_FALLBACK_POSITION} apiKey={apiKey} route={route} />
      ) : (
        <YandexMapWidget position={TAXI_FALLBACK_POSITION} route={route} />
      )}
    </div>
  )
}
