import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()

  // Require authentication for all /admin
  const token = await getToken({ req })
  if (!token) {
    const signin = new URL('/api/auth/signin', req.url)
    signin.searchParams.set('callbackUrl', req.nextUrl.pathname)
    return NextResponse.redirect(signin)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
