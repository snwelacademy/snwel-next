import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      roles?: string[],
      jwt?: string,
      id?: string
    } & DefaultSession["user"]
  }

  interface User {
    /** The user's postal address. */
    roles?: string[],
    jwt?: string,
    id?: string
  }
}