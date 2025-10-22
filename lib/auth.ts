import { constants } from "@/config/constants";
import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    callbacks: {
        async jwt({ token, user }) {
            const u = user as any;
            if (u) {
                // Keep JWT small to avoid 431 header issues
                return {
                    // next-auth internals
                    ...token,
                    // minimal custom fields
                    id: u?.id,
                    jwt: u?.jwt,
                }
            }
            return token
        },
        async session({ session, token, user }) {
            // Expose only minimal fields in session; roles/permissions come from /auth/me
            session.user.jwt = token?.jwt as string
            session.user.id = token?.id as string
            return session
        }
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                const headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Accept', 'application/json');
                const res = await fetch(`${constants.apiBaseUrl}/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers
                });

                if(!res.ok) return null;

                const {token, ...rest} = await res.json()
                console.log("USER DATA", {token, rest});
                return {
                    jwt: token, 
                    ...rest
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/admin/signin'
    }
}

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }