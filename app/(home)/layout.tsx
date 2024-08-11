import React from 'react'
import MainLayout from '../../components/MainLayout'

const HomeLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
  return (
    <MainLayout>{children}</MainLayout>
  )
}

export default HomeLayout