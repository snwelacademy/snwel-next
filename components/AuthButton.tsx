'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Button } from './ui/button';


const AuthButton = () => {
    const session = useSession();
    if(session && session.status === 'authenticated') return <Button onClick={() => signOut({ callbackUrl: '/auth/admin/signin' })}>Log Out</Button>
  return (
    <Button onClick={() => signIn()}>LogIn</Button>
  )
}

export default AuthButton