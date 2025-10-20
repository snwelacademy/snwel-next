'use client'

import { useContext, useEffect, useState } from "react";
import MenuBuilder from "../menu-builder";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { nanoid } from "nanoid";
import { useToast } from "../ui/use-toast";
import { getSetting, updateSetting } from "@/services/admin/setting-service";
import { GeneralSetting, MenuSchemaWithChildrenType, MenuSetting, Setting, SETTINGS } from "@/types";
import { AppContext } from "../AppProviders";
import { PlusSquareIcon, Save } from "lucide-react";
import { deepEqual } from "assert";
import { useQuery } from "@tanstack/react-query";
const initialHeaderMenus = [
    {
        id: nanoid(),
        name: "Home",
        href: "/",
        children: [],
    },
    {
        id: nanoid(),
        href: "/courses",
        name: "Courses",
        children: [
            {
                id: nanoid(),
                name: "Piping",
                href: "/courses?category=piping",
                children: [],
            },
            {
                id: nanoid(),
                name: "Mechanical",
                href: "/courses?category=mechenical",
                children: [],
            },
            {
                id: nanoid(),
                name: "Civil & Structural",
                href: "/courses?category=civil-and-structural",
                children: [],
            },
        ],
    },
    {
        id: nanoid(),
        name: "About",
        href: "/about",
        children: [],
    },
    {
        id: nanoid(),
        name: "Contact",
        href: "/contact",
        children: [],
    },
    {
        id: nanoid(),
        name: "Webinars",
        href: "/webinars",
        children: [],
    },
    {
        id: nanoid(),
        name: "Job Vaccancy",
        href: "/job-vacancies",
        children: [],
    },
];

const initialFooterMenus = [
    {
        id: nanoid(),
        name: "Home",
        href: "/",
        children: [],
    },
    {
        id: nanoid(),
        href: "/courses",
        name: "Courses",
        children: [],
    },
    {
        id: nanoid(),
        name: "About",
        href: "/about",
        children: [],
    },
    {
        id: nanoid(),
        name: "Contact",
        href: "/contact",
        children: [],
    }
];

const initialFormData = {
    id: nanoid(),
    name: "Menu Item",
    href: "",
    img: "",
    children: [],
    desc: ""
};


const extractMenuBuilderSetting = (settings: Setting[]) => {
    const result = settings.find(val => val.code === SETTINGS.MENUBUILDER);
    console.log({result})
    return result;
}

export function MenuBuilderComponent() {
    const {data: settingData, isLoading} = useQuery({
        queryKey: ['admin/setting/menu-builder'],
        queryFn: () => getSetting<any>(SETTINGS.MENUBUILDER)
    })
    const {settings} = useContext(AppContext);
    const [menus, setMenus] = useState<any>(initialHeaderMenus);
    const [footerMenu, setFooterMenus] = useState<any>(initialFooterMenus);
    const [formData, setFormData] = useState(initialFormData);
    const [updating, setUpdating] = useState(false);
    const [changed, setChanged] = useState(false);
    const {toast} = useToast();

 
    const saveSetting = async () => {
        if(updating) return true;
        setUpdating(true);
        try {
        await updateSetting("MENUBUILDER", {isChangable: true, data: {menus, footerMenu}, code: "MENUBUILDER" });
        toast({
            title: 'Setting Saved Successfully!',
            variant: 'success'
        })
        setUpdating(false)
        } catch (error) {
            toast({
                title: 'Problem in updating setting!',
                variant: 'destructive'
            })
        }finally{
            setUpdating(false)
        }
    }

    const addMenu = () => {
        setMenus([
            ...menus,
            {
                ...formData,
                id: Math.random().toString(36).substring(7),
            },
        ]);
        setFormData({ id: nanoid(), name: "Menu Item", href: "", children: [], img: "", desc: '' });
    };
    const addFooterMenu = () => {
        setFooterMenus([
            ...footerMenu,
            {
                ...formData,
                id: Math.random().toString(36).substring(7),
            },
        ]);
        setFormData({ id: nanoid(), name: "Menu Item", href: "", children: [], img: "", desc: '' });
    };

    useEffect(() => {
      if(settingData && settingData._id){
        setMenus(settingData.data.menus);
        setFooterMenus(settingData.data.footerMenu)
      }
    }, [settingData])
    

    useEffect(() => {
      console.log({menus})
    }, [menus])
    

    return (
       <div className="space-y-5 pt-8">
        <div className="flex items-center justify-end">
        <Button disabled={updating} onClick={() => saveSetting()}> <Save className="w-4 h-4 mr-2"/> Save</Button>
        </div>
             <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card className="">
                <CardHeader className="flex justify-between flex-row items-center">
                    <CardTitle>Header Menu</CardTitle>
                    <div className=" flex gap-3 ">
                        <Button
                        variant={'outline'}
                            className=""
                            onClick={() => {
                                addMenu();
                            }}
                            >
                            <PlusSquareIcon className="mr-2 w-4 h-4"/>
                            Add Menu
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="overflow-auto">
                    <div>
                        <MenuBuilder items={menus} setItems={setMenus} />
                    </div>
                </CardContent>
            </Card>

            <Card className="">
                <CardHeader className="flex justify-between flex-row items-center">
                    <CardTitle>Footer Menu</CardTitle>
                    <div className="">
                    <Button
                        variant={'outline'}
                            className=""
                            onClick={() => {
                                addFooterMenu();
                            }}
                            >
                            <PlusSquareIcon className="mr-2 w-4 h-4"/>
                            Add Menu
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="overflow-auto">
                    <div>
                        <MenuBuilder items={footerMenu} setItems={setFooterMenus} />
                    </div>
                </CardContent>
            </Card>
        </div>
       </div>
    );
}