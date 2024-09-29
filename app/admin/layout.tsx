
// ProtectedRoute.js

import PageLoader from '@/components/PageLoader';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/header';
import AdminSidebar from '@/data/AdminNav';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';

async function AdminLayout({children}: {children: any}) {
  const session = await getSession()
  if (!session || !session.user) {
    console.log("Not logged in")
    return redirect('/api/auth/signin')
  }

  return <>
    
     <Header />
    
    <div className="flex h-screen overflow-hidden">
      {/* <Sidebar /> */}
      <AdminSidebar/>
      <main className="w-full pt-16 overflow-auto relative">
        <React.Suspense fallback={<PageLoader/>}>
        {children}
        </React.Suspense>
      </main>
    </div>
  </>
}

export default AdminLayout;

