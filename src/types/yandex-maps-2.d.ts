declare namespace ymaps {
  interface IMapOptions {
    center?: number[]
    zoom?: number
    controls?: string[]
    suppressMapOpenBlock?: boolean
  }

  interface IPlacemarkOptions {
    iconLayout?: IClassConstructor<ILayout>
    iconOffset?: number[]
    iconShape?: IGeometryJson
  }

  interface IClassConstructor<T> {
    new (...args: unknown[]): T
  }

  interface ILayout {
    build(): void
    clear(): void
  }

  interface IGeometryJson {
    type: string
    coordinates?: number[] | number[][]
    radius?: number
  }

  interface IMap {
    geoObjects: ICollection
    destroy(): void
    setCenter(center: number[], zoom?: number): void
  }

  interface ICollection {
    add(object: IGeoObject): void
    remove(object: IGeoObject): void
  }

  interface IGeoObject {}

  interface IPlacemark extends IGeoObject {
    geometry: { setCoordinates(coords: number[]): void }
  }

  interface TemplateLayoutFactory {
    createClass(template: string): IClassConstructor<ILayout>
  }

  const templateLayoutFactory: TemplateLayoutFactory

  class Map {
    constructor(element: HTMLElement | string, state: IMapOptions, options?: Record<string, unknown>)
    geoObjects: ICollection
    destroy(): void
    setCenter(center: number[], zoom?: number): void
  }

  class Placemark implements IPlacemark {
    constructor(
      geometry: number[],
      properties?: Record<string, unknown>,
      options?: IPlacemarkOptions,
    )
    geometry: { setCoordinates(coords: number[]): void }
  }

  function ready(callback: () => void): void
}

interface Window {
  ymaps?: typeof ymaps
}
