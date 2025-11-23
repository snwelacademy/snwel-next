'use client'

import EditPage from '@/components/admin-components/page/edit-page'
import React from 'react'
import { PermissionGuard } from '@/components/guards/PermissionGuard'
import { PAGE_PERMISSIONS } from '@/constants/permissions'

const Page = () => {
  return (
    <PermissionGuard permission={PAGE_PERMISSIONS.PAGE_VIEW}>
      <EditPage/>
    </PermissionGuard>
  )
}

export default Page