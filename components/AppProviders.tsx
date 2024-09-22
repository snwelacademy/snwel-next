'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { createContext, ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth';
import { Toaster } from './ui/toaster';
import { Setting } from '@/types';

type AppContextType = {
  settings: Setting[]
}

export const AppContext = createContext<AppContextType>({
  settings: []
})

const AppProviders = ({
  session,
  data,
  children
}: {
  children: ReactNode,
  session: Session | null,
  data: {settings: Setting[]}
}) => {
  const client = new QueryClient()
  return (
    <AppContext.Provider value={data}>
      <SessionProvider session={session} refetchOnWindowFocus={false} refetchWhenOffline={false}>
      <QueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Toaster />
    </SessionProvider>
    </AppContext.Provider>
  )
}

export default AppProviders