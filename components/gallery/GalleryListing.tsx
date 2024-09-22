'use client'

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn, extractYouTubeVideoId } from "@/lib/utils"
import { Maximize2, X } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { ListOptions } from "@/types/ListOptions"
import { getAllGalleryAssets } from "@/services/admin/gallery-service"
import { Skeleton } from "../ui/skeleton"

// Mock data for photos and videos
const photos = [
    "https://images.pexels.com/photos/28243686/pexels-photo-28243686/free-photo-of-a-cat-is-walking-on-a-pier.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://cdn.pixabay.com/photo/2024/05/05/07/41/lizard-8740424_640.jpg",
    "https://images.pexels.com/photos/28297579/pexels-photo-28297579/free-photo-of-a-view-of-a-building-with-a-dome-on-top.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/28005837/pexels-photo-28005837/free-photo-of-man-on-bike-trip-in-mountains.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/28279101/pexels-photo-28279101/free-photo-of-grand-central-terminal.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/28279101/pexels-photo-28279101/free-photo-of-grand-central-terminal.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
]

const videos = [
    { id: "pf82Mt6vHgk", title: "Video 1" },
    { id: "9sYIHKesK9M", title: "Video 2" },
    { id: "AFE4CVpDIkA", title: "Video 3" },
    { id: "BpvEY-2dSdU", title: "Video 4" },
]

const MotionTabsContent = motion(TabsContent)

const FullScreenImage = ({ src, alt, onClose }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
        >
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ type: "spring", damping: 15, stiffness: 100 }}
                className="relative w-full h-full max-w-5xl max-h-5xl grid place-content-center"
            >
                <Button
                    className="absolute top-4 right-4 z-10"
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                >
                    <X className="w-6 h-6 text-white" />
                    <span className="sr-only">Close full-screen image</span>
                </Button>
                <motion.img
                    src={src}
                    alt={alt}
                    className="w-full max-w-full h-auto"
                />
            </motion.div>
        </motion.div>
    )
}

const YouTubePlayer = ({ videoId, onClose }: { videoId: string, onClose: any }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={cn([
                "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            ])}
        >
            <motion.div
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
                exit={{ y: "100vh" }}
                transition={{ type: "spring", damping: 15, stiffness: 100 }}
                className="relative w-full max-w-4xl aspect-video bg-white rounded-lg overflow-hidden"
            >
                <Button
                    className="absolute top-2 right-2 z-10"
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </Button>
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </motion.div>
        </motion.div>
    )
}

export function AnimatedGalleryPage() {
    const [activeTab, setActiveTab] = useState("image")
    const [activeVideo, setActiveVideo] = useState("");
    const [fullScreenImage, setFullScreenImage] = useState<any>(null);
    const [options, setOptions] = useState<ListOptions>({ limit: 30, page: 1, filter: { linkType: activeTab } })
    const { data: assets, isLoading } = useQuery({
        queryKey: ['/admin/gallery', JSON.stringify(options)],
        queryFn: () => getAllGalleryAssets(options)
    });

    useEffect(() => {
        setOptions(opt => ({ ...opt, filter: { ...opt.filter, linkType: activeTab } }))
    }, [activeTab])


    // if(true){
    //     return (
    //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 container mx-auto">
    //           {[...Array(8)].map((_, i) => (
    //             <div key={i} className="bg-card rounded-lg shadow-md overflow-hidden">
    //               <Skeleton className="h-48 w-full" />
    //               <div className="p-4 space-y-2">
    //                 <Skeleton className="h-4 w-3/4" />
    //                 <Skeleton className="h-4 w-1/2" />
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       )
    // }

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold mb-6"
            >
                SNWELL Academy Gallery
            </motion.h1>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="image">Photos</TabsTrigger>
                    <TabsTrigger value="youtube">Videos</TabsTrigger>
                </TabsList>
                <AnimatePresence mode="wait">
                    <MotionTabsContent
                        key={activeTab}
                        value={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === "image" && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 min-h-[70vh]">
                                    {!isLoading && assets?.docs.map((photo, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            className="relative aspect-video group"
                                        >

                                            <motion.img
                                                src={photo.link}
                                                className="rounded-lg"
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => setFullScreenImage({ src: photo.link, alt: photo.name })}
                                            >
                                                <Maximize2 className="w-5 h-5" />
                                                <span className="sr-only">View full-screen</span>
                                            </Button>
                                        </motion.div>
                                    ))}

                                </div>
                                {
                                    isLoading &&
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 container mx-auto ">
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} className="bg-card rounded-lg shadow-md overflow-hidden">
                                                <Skeleton className="h-48 w-full" />
                                                <div className="p-4 space-y-2">
                                                    <Skeleton className="h-4 w-3/4" />
                                                    <Skeleton className="h-4 w-1/2" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }

                            </>
                        )}
                        {activeTab === "youtube" && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 min-h-[70vh]">
                                    {!isLoading && assets?.docs.map((video, index) => {
                                        const videoId = extractYouTubeVideoId(video.link)
                                        return <motion.div
                                            key={videoId}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                        >
                                            <Button
                                                variant="outline"
                                                className="w-full h-auto aspect-video p-0 overflow-hidden"
                                                onClick={() => setActiveVideo(videoId || '')}
                                            >
                                                {/* <AnimatedImage
                                            src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                                            alt={video.title}
                                            width={320}
                                            height={180}
                                            className="w-full h-full object-cover"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.2 }}
                                        /> */}
                                                <motion.img
                                                    alt={video.name}
                                                    src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                                                    className="rounded-lg"
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                                <div className={cn([
                                                    "hidden inset-0 items-center justify-center bg-black bg-opacity-50",
                                                    {
                                                        "absolute flex": Boolean(activeVideo)
                                                    }
                                                ])}>
                                                    <svg
                                                        className="w-12 h-12 text-white"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                </div>
                                            </Button>
                                        </motion.div>
                                    })}

                                </div>
                                {
                                    isLoading &&
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 container mx-auto">
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} className="bg-card rounded-lg shadow-md overflow-hidden">
                                                <Skeleton className="h-48 w-full" />
                                                <div className="p-4 space-y-2">
                                                    <Skeleton className="h-4 w-3/4" />
                                                    <Skeleton className="h-4 w-1/2" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }

                            </>
                        )}
                    </MotionTabsContent>
                </AnimatePresence>
            </Tabs>
            <AnimatePresence>
                {Boolean(activeVideo) && <YouTubePlayer videoId={activeVideo} onClose={() => setActiveVideo("")} />}
                {fullScreenImage && (
                    <FullScreenImage
                        src={fullScreenImage.src}
                        alt={fullScreenImage.alt}
                        onClose={() => setFullScreenImage(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
