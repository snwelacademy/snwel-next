
import nextDynamic from "next/dynamic";
import { conf } from "@/components/page-builder/builder";
import Typography from "@/components/typography";
import { getAllMasters } from "@/services/admin/admin-master";
import { Metadata } from "next";

const RenderPage = nextDynamic(() => import('@/components/page-builder/RenderPage'), { ssr: false })

export const dynamic = 'force-dynamic'
export const revalidate = 0

type Props = {
    params: { slug: string[] }
}

async function getPageBySlug(slug: string) {
    const masters = await getAllMasters({ code: slug, parentCode: 'PAGE' });
    return masters.docs[0];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = params.slug.join('/');
    const page = await getPageBySlug(slug);

    if (!page) {
        return {
            title: 'Page Not Found',
        };
    }

    const seo = page.meta?.root?.seo || {};

    return {
        title: seo.title || page.name || 'Snwel Academy',
        description: seo.description || 'Learn from the best.',
        keywords: seo.keywords ? seo.keywords.split(',').map((k: string) => k.trim()) : [],
        openGraph: {
            title: seo.title || page.name,
            description: seo.description,
            images: seo.image ? [{ url: seo.image }] : [],
        }
    };
}

const CustomPage = async ({ params }: Props) => {
    const slug = params.slug.join('/');
    const page = await getPageBySlug(slug);

    if (!page) {
        return <div className="w-screen h-screen grid place-content-center">
            <Typography as="title">Page Not Found!</Typography>
        </div>
    }

    return (
        <RenderPage config={conf as any} data={page.meta as any} />
    )
}

export default CustomPage
