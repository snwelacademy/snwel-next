'use client'
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { UpdateCourseCategory } from "@/types"
import CourseCategoryForm from "./MutateCategoryForm"
import { ReactNode } from "react"



const MutateCategoryDrawer = ({categoryData, trigger}: {categoryData?: UpdateCourseCategory, trigger?: ReactNode}) => {
    return (
        <Drawer modal >
            <DrawerTrigger asChild>{trigger}</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{categoryData ? "Edit Category" : "Create Category"}</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>

                <CourseCategoryForm categoryData={categoryData}/>
                {/* <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter> */}
            </DrawerContent>
        </Drawer>

    )
}

export default MutateCategoryDrawer
