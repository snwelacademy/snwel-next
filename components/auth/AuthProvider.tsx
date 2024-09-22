'use client'
/* eslint-disable react-hooks/exhaustive-deps */

import { getMe, login } from '@/services/auth-service';
import { CurrentUser } from '@/types/User';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect } from 'react';

type AuthCredentials = {
    email: string,
    password: string
}
type AuthContext = {
    currentUser?: CurrentUser | null,
    signIn: (cred: AuthCredentials) => Promise<any>,
    signOut: () => void,
    token?: string,
    refreshAuth: () => Promise<CurrentUser|null>
}


const AuthContext = createContext<AuthContext>({} as AuthContext);




export const AuthProvider = ({ children }: { children: any }) => {
    const {data: user} = useSession();
    const [currentUser, setUser] = useLocalStorage<CurrentUser | undefined | null>('user')
    const [token, setToken] = useLocalStorage<string | undefined>('token');
    const signIn = async (userData: { email: string, password: string }) => {
        try {
            const token = await login(userData);
            setToken(token);
            const user = await getMe(token);
            setUser(user)
        } catch (error) {
            signOut();
        }
    };

   const refreshAuth = async() => {
    console.log("Refresh auth")
            const user = await getMe(token);
            if(!user) {
                signOut()
                return null;
            }
            setUser(user);
            return user;
   }

    const signOut = () => {
        setToken(undefined);
        setUser(undefined)
    };

    useEffect(() => {
        // refreshAuth();
    }, [user])

    return (
        <AuthContext.Provider value={{ token, currentUser, signIn, signOut, refreshAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
