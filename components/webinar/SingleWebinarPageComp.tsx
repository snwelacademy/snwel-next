'use client'
import SingleWebinar from "@/components/webinar/SingleWebinar";
import { WebinarContextProvider } from "@/components/webinar/WebinarContext";
import { getWebinar } from "@/services/admin/webinar-service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";


const SingleWebinarPageComp = () => {
    const { slug } = useParams();
    const { data: webinar, isLoading } = useQuery({
        queryKey: ['/admin/webinar', slug],
        queryFn: () => getWebinar(slug as string || '')
    })

    if (isLoading) {
        return (
            <div className="h-screen w-screen inset-0 z-50 flex items-center justify-center bg-background">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <p className="text-primary">Loading...</p>
                </div>
            </div>
        )
    }
    if (!slug || !webinar) return <div className="flex items-center">Not Found!</div>
    return (
        <>
            <WebinarContextProvider>
                <SingleWebinar webinar={webinar} />
            </WebinarContextProvider>
        </>
    )
}

export default SingleWebinarPageComp