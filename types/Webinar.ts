

type WebinarUser = {
    _id: string,
    name: string,
    email: string,
    profilePic?: string
}


export type Webinar = {
    _id: string;
    title: string;
    shortDescription: string;
    content: string;
    startDate: string;
    slug: string;
    thumbnail: string;
    coverImage: string
    createdBy: WebinarUser,
    hosts: WebinarUser[],
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
    price?: number,
    currency?: string,
    curriculum: { title: string, duration: string }[]
}

