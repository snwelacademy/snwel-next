'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth';
import { Toaster } from './ui/toaster';

const AppProviders = ({
  session,
  children
}: {
  children: ReactNode,
  session: Session | null
}) => {
  const client = new QueryClient()
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Toaster />
    </SessionProvider>
  )
}

export default AppProviders