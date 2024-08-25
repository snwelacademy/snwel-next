import { constants } from "@/config/constants";
import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    callbacks: {
        async jwt({ token, user }) {
            const u = user as any;
            // console.log("JWT",{token, user})
            if(user){
                token.roles = u?.roles
                return {
                    ...token,
                    jwt: u.jwt
                }
            }
            return token
        },
        async session({ session, token, user }) {
            session.user.roles = token?.roles as string[];
            session.user.jwt = token?.jwt as string
            // console.log("SESSION: ",{token, user, session})
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
                // console.log("USER DATA", rest);
                return {
                    jwt: token, 
                    ...rest
                }
            }
        })
    ],
}

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }