// import AnimatedComponent from "@/components/animate/AnimatedComponent";
import nextDynamic from "next/dynamic";
import { conf } from "@/components/page-builder/builder";
import Typography from "@/components/typography";
import { fetchMaster } from "@/services/admin/admin-master";
const RenderPage = nextDynamic(() => import('@/components/page-builder/RenderPage'), { ssr: false })

export const dynamic = 'force-dynamic'
export const revalidate = 0


const HomePage = async () => {
  const master = await fetchMaster("HOME-PAGE");

  if (!master) {
    return <div className="w-screen h-screen grid place-content-center">
      <Typography as="title">Page Not Found!</Typography>
    </div>
  }

  return (
    <RenderPage data={master.meta as any} />
  )

}



export default HomePage