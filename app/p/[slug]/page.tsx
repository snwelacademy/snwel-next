import nextDynamic from "next/dynamic";
import { conf } from "@/components/page-builder/builder";
import Typography from "@/components/typography";
import { fetchMaster } from "@/services/admin/admin-master";
import { Metadata } from "next";

const RenderPage = nextDynamic(() => import('@/components/page-builder/RenderPage'), { ssr: false })

export const dynamic = 'force-dynamic'
export const revalidate = 0

type Props = {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const slug = params.slug
    const master = await fetchMaster(slug);

    return {
        title: master?.name || 'Page Not Found',
    }
}

const Page = async ({ params }: Props) => {
    const master = await fetchMaster(params.slug);

    if (!master) {
        return <div className="w-screen h-screen grid place-content-center">
            <Typography as="title">Page Not Found!</Typography>
        </div>
    }

    const defaultData = {
        content: [],
        root: { props: { title: master.name || '' } },
        zones: {}
    };

    return (
        <RenderPage data={master.meta || defaultData} />
    )
}

export default Page
