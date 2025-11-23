'use client'

import PageList from '@/components/admin-components/page/pagelist'
import React from 'react'
import { PermissionGuard } from '@/components/guards/PermissionGuard'
import { PAGE_PERMISSIONS } from '@/constants/permissions'

const Page = () => {
  return (
    <PermissionGuard permission={PAGE_PERMISSIONS.PAGE_VIEW}>
      <PageList/>
    </PermissionGuard>
  )
}

export default Page