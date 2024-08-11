export type CurrentUser = {
    _id: string,
    name: string,
    email: string,
    profilePic?: string,
    role: string[]
}
export type User = {
    _id: string,
    name: string,
    email: string,
    profilePic?: string,
    role: string[],
    location?: {
        addr?: string,
        state?: string,
        city?: string,
        country?: string
      }
}