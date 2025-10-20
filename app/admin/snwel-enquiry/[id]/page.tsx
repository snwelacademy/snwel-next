import SnwelEnquiryDetail from '@/components/admin-components/snwel-enquiry/SnwelEnquiryDetail'
import React from 'react'

interface PageProps {
  params: {
    id: string
  }
}

const Page = ({ params }: PageProps) => {
  return (
    <SnwelEnquiryDetail enquiryId={params.id} />
  )
}

export default Page
