export interface Testimonial {
    _id: string
    name: string
    position?: string
    company?: string
    content: string
    avatar?: string
    rating?: number
    published?: boolean
    publishedAt?: string
    createdAt: string
    updatedAt: string
}
