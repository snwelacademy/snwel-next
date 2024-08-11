'use client'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "../ui/card"
import { Widgets, _WidgetType } from "@/types/WidgetTypes"
import { Wand2 } from "lucide-react"
import { Icons } from "../icons"
import Typography from "../typography"
import { Button } from "../ui/button"
import Link from "next/link"
import { nanoid } from "nanoid"



const WidgetCard = ({data}: {data: _WidgetType}) => {
    const Icon = Icons[data.icon as keyof typeof Icons || "arrowRight"];
    return <Link className="block" href={`/admin/widgets/new?type=${data.type}`}>
        <Card className="bg-white ">
        <CardContent className="pt-5 flex items-center gap-5">
            <div className="p-3 border-2 inline-flex items-center justify-center rounded-xl">
                {
                    Icon ? <Icon className="w-8 h-8" /> : <Wand2/>
                }
            </div>

            <div className="flex-grow">
                <Typography as="h3" >{data.title}</Typography>
                <Typography as="paragraph" >{data.description}</Typography>
            </div>
        </CardContent>
    </Card>
    </Link>
}

const WidgetCatelog = ({children}: {children?: any}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {
                    children ? children : <Button>Create</Button>
                }
            </DialogTrigger>
            <DialogContent className="max-w-[1000px] w-full">
                <DialogHeader>
                    <DialogTitle>Widget Catelog</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {
                        Object.values(Widgets).map(wdg => {
                            return <WidgetCard key={nanoid()} data={wdg} />
                        })
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default WidgetCatelog