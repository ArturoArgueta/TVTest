export interface CarouselResource {
    _id: string
    onClick?: () => void
}

export interface CarouselContainer {
    _id: string
    aspectRatio: number
    resource_width: number
    resources: CarouselResource[]
}

export interface Carousel {
    containers: CarouselContainer[]
}
