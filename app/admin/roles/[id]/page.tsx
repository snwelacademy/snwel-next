import RoleDetailPage from '@/components/admin-components/roles/RoleDetailPage'

const Page = ({ params }: { params: { id: string } }) => {
  return <RoleDetailPage roleId={params.id} />
}

export default Page
