const YANDEX_MAPS_SCRIPT_ID = 'yandex-maps-script'

/** Новосибирск (Калининский район) — в интерфейсе город подписан как Энск */
export const TAXI_FALLBACK_POSITION: [number, number] = [55.0798, 82.9586]

export function buildMapWidgetUrl([lat, lon]: [number, number], zoom = 16) {
  const params = new URLSearchParams({
    ll: `${lon},${lat}`,
    z: String(zoom),
    l: 'map',
    scroll: 'false',
  })

  return `https://yandex.ru/map-widget/v1/?${params.toString()}`
}

function getRouteDistanceKm(from: [number, number], to: [number, number]) {
  const earthRadiusKm = 6371
  const dLat = ((to[0] - from[0]) * Math.PI) / 180
  const dLon = ((to[1] - from[1]) * Math.PI) / 180
  const lat1 = (from[0] * Math.PI) / 180
  const lat2 = (to[0] * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2

  return 2 * earthRadiusKm * Math.asin(Math.sqrt(a))
}

function getRouteZoom(from: [number, number], to: [number, number]) {
  const distanceKm = getRouteDistanceKm(from, to)

  if (distanceKm > 25) return 10
  if (distanceKm > 12) return 11
  if (distanceKm > 6) return 12
  if (distanceKm > 3) return 13
  return 14
}

export function buildMapRouteUrl(from: [number, number], to: [number, number]) {
  const centerLon = (from[1] + to[1]) / 2
  const centerLat = (from[0] + to[0]) / 2
  // Только координаты — вымышленные адреса Яндекс ищет по всей стране
  const routeText = `${from[0]},${from[1]}~${to[0]},${to[1]}`

  const params = new URLSearchParams({
    ll: `${centerLon},${centerLat}`,
    z: String(getRouteZoom(from, to)),
    l: 'map',
    scroll: 'false',
    rtext: routeText,
    rtm: 'atm',
  })

  return `https://yandex.ru/map-widget/v1/?${params.toString()}`
}

export type TaxiMapRoute = {
  from: [number, number]
  to: [number, number]
}

export function hideYandexMapChrome(root: ParentNode) {
  root.querySelectorAll<HTMLElement>(
    [
      '[class*="copyright"]',
      '[class*="gotoymaps"]',
      '[class*="gototech"]',
      '[class*="map-copyrights"]',
      'a[href*="yandex.ru/maps"]',
      'a[href*="yandex.com/maps"]',
    ].join(','),
  ).forEach((element) => {
    element.style.display = 'none'
    element.style.visibility = 'hidden'
    element.setAttribute('aria-hidden', 'true')
  })
}

export function configureTaxiMap(map: ymaps.IMap) {
  const interactiveMap = map as ymaps.IMap & {
    behaviors: { disable: (behaviors: string[]) => void }
    options: { set: (key: string, value: unknown) => void }
  }

  interactiveMap.behaviors.disable([
    'drag',
    'scrollZoom',
    'dblClickZoom',
    'multiTouch',
    'rightMouseButtonMagnifier',
    'leftMouseButtonMagnifier',
  ])

  interactiveMap.options.set('copyrightLogoVisible', false)
  interactiveMap.options.set('copyrightUaVisible', false)
  interactiveMap.options.set('yandexMapDisablePoiInteractivity', true)
  interactiveMap.options.set('suppressMapOpenBlock', true)
}

let loadPromise: Promise<typeof ymaps> | null = null

export function getYandexMapsApiKey() {
  return import.meta.env.VITE_YANDEX_MAPS_API_KEY?.trim() ?? ''
}

export function loadYandexMaps(apiKey: string) {
  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    if (window.ymaps) {
      window.ymaps.ready(() => resolve(window.ymaps!))
      return
    }

    const existingScript = document.getElementById(YANDEX_MAPS_SCRIPT_ID)
    if (existingScript) {
      existingScript.addEventListener('load', () => {
        window.ymaps?.ready(() => resolve(window.ymaps!))
      })
      existingScript.addEventListener('error', () => reject(new Error('Не удалось загрузить Яндекс.Карты')))
      return
    }

    const script = document.createElement('script')
    script.id = YANDEX_MAPS_SCRIPT_ID
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${encodeURIComponent(apiKey)}&lang=ru_RU`
    script.async = true
    script.onload = () => {
      window.ymaps?.ready(() => resolve(window.ymaps!))
    }
    script.onerror = () => reject(new Error('Не удалось загрузить Яндекс.Карты'))
    document.head.appendChild(script)
  })

  return loadPromise
}

export function getDriverPosition(fallback: [number, number] = TAXI_FALLBACK_POSITION) {
  return Promise.resolve(fallback)
}

export function createDriverPlacemark(ymapsApi: typeof ymaps, position: [number, number]) {
  const DriverIconLayout = ymapsApi.templateLayoutFactory.createClass(
    `<div style="width:44px;height:44px;margin-left:-22px;margin-top:-22px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:#fff;box-shadow:0 3px 12px rgba(0,0,0,0.14)">
      <svg width="20" height="20" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 4.5L20.8 18.6Q14 15.2 7.2 18.6L14 4.5Z" fill="#2B2B2B"/>
      </svg>
    </div>`,
  )

  return new ymapsApi.Placemark(
    position,
    {},
    {
      iconLayout: DriverIconLayout,
      iconShape: {
        type: 'Circle',
        coordinates: [0, 0],
        radius: 22,
      },
    },
  )
}
