'use client'
/* eslint-disable react-hooks/exhaustive-deps */

import { getMe, login } from '@/services/auth-service';
import { CurrentUser } from '@/types/User';
import { useLocalStorage } from '@uidotdev/usehooks';
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

export const useAuth = () => {
    return useContext(AuthContext);
};



export const AuthProvider = ({ children }: { children: any }) => {
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
        refreshAuth();
    }, [])

    return (
        <AuthContext.Provider value={{ token, currentUser, signIn, signOut, refreshAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
