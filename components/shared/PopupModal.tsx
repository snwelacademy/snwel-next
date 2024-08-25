'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
} from "@/components/ui/dialog"
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import JoinCourseForm from "./JoinCourseForm";

type PopupState = {
    lastViewd?: Date,
    filled: false,
}

const PopupModal = () => {
    const [popup, setPopup] = useLocalStorage<PopupState>("popup", {filled: false});
    const [open, setIsOpen] = useState(false);
    useEffect(() => {
        if(!popup.filled && !popup.lastViewd && !open ){
            setTimeout(() => {
                setIsOpen(true);
                setPopup({
                    lastViewd: new Date(),
                    filled: false
                })
            }, 3000);
            return;
        }

        if(!popup.filled && popup.lastViewd && !open && new Date(popup.lastViewd).getTime() + 24 * 60 * 60 * 1000 < new Date().getTime()){
            setTimeout(() => {
                setIsOpen(true);
                setPopup({
                    lastViewd: new Date(),
                    filled: false
                })
            }, 3000);
            return;
        }
    })
    return (
        <Dialog open={open} onOpenChange={setIsOpen}>
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent className="max-w-xl ">
                <DialogHeader>
                    <DialogTitle>Begin to build career</DialogTitle>
                    {/* <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription> */}
                </DialogHeader>

                <div className="mt-5" onClick={() => setIsOpen(open => !open)}>
                    <JoinCourseForm/>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default PopupModal