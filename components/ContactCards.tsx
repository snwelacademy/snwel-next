'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { getSetting } from "@/services/admin/setting-service"
import { SETTINGS } from "@/types"
import { prepareAddressString } from "@/lib/utils"
import { SocialMediaLinks } from "./SocialMediaLinks"

const ContactCardSkeleton = () => (
    <Card>
        <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
        </CardContent>
    </Card>
)

export default function ContactUsCards() {

    const { data: settingData, isLoading } = useQuery({
        queryKey: ['admin/setting/general'],
        queryFn: () => getSetting<any>(SETTINGS.GENERAL)
    })


    if (isLoading) {
        return (
            <div className="container mx-auto py-12">
                <Skeleton className="h-12 w-1/2 mx-auto mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ContactCardSkeleton />
                    <ContactCardSkeleton />
                    <ContactCardSkeleton />
                </div>
            </div>
        )
    }

    return (
        <div className=" mx-auto py-12">
            <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="relative">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="h-5 w-5" />
                            Email Us
                        </CardTitle>
                        <CardDescription>Reach out via email</CardDescription>
                    </CardHeader>
                    <CardContent className="relative md:absolute bottom-0">
                        <p className="mb-4">We'll respond within 24 hours</p>
                        <a href={`mailto:${settingData?.data?.contacts?.email}`}>
                            <Button className="w-full" disabled={!Boolean(settingData?.data?.contacts?.email)}>
                                <Mail className="mr-2 h-4 w-4" /> Email Us
                            </Button>
                        </a>
                    </CardContent>
                </Card>

                <Card className="relative">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Phone className="h-5 w-5" />
                            Call Us
                        </CardTitle>
                        <CardDescription>Speak with our team</CardDescription>
                    </CardHeader>
                    <CardContent className="relative md:absolute bottom-0">
                        <div className="h-full">
                            <p className="mb-4">Available Mon-Fri, <br /> 09:30am-06:30pm</p>
                            <a href={`tel:${settingData?.data?.contacts?.phone}`}>
                                <Button className="w-full" disabled={!Boolean(settingData?.data?.contacts?.phone)}>
                                    <Phone className="mr-2 h-4 w-4" /> Call Now
                                </Button>
                            </a>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Visit Us
                        </CardTitle>
                        <CardDescription>Come to our office</CardDescription>
                    </CardHeader>
                    <CardContent className="relative flex flex-col justify-end">
                        <p className="mb-4">{prepareAddressString(settingData?.data?.location)}</p>
                        <a href={`${settingData?.data?.location?.url || '#'}`}>
                            <Button className="w-full" disabled={!Boolean(settingData?.data?.location?.url)}>
                                <MapPin className="mr-2 h-4 w-4" /> Get Directions
                            </Button>
                        </a>
                    </CardContent>
                </Card>
            </div>

            {
                settingData?.data?.socialLinks &&
                <div className="mt-12 text-center">
                <h2 className="text-2xl font-semibold mb-4">Connect With Us</h2>
                <SocialMediaLinks links={settingData?.data?.socialLinks} />
            </div>
            }
        </div>
    )
}