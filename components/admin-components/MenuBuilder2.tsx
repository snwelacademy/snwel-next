// import { useContext, useEffect, useState } from "react";
// import MenuBuilder from "react-dnd-menu-builder";
// import { Button } from "../ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { ScrollArea } from "../ui/scroll-area";
// import { nanoid } from "nanoid";
// import { useToast } from "../ui/use-toast";
// import { updateSetting } from "@/services/admin/setting-service";
// import { Setting, SETTINGS } from "@/types";
// import { AppContext } from "../AppProviders";
// import { PlusSquareIcon, Save } from "lucide-react";
// import { deepEqual } from "assert";
// const initialHeaderMenus = [
//     {
//         id: nanoid(),
//         name: "Home",
//         href: "/",
//         children: [],
//     },
//     {
//         id: nanoid(),
//         href: "/courses",
//         name: "Courses",
//         children: [
//             {
//                 id: nanoid(),
//                 name: "Piping",
//                 href: "/courses?category=piping",
//                 children: [],
//             },
//             {
//                 id: nanoid(),
//                 name: "Mechanical",
//                 href: "/courses?category=mechenical",
//                 children: [],
//             },
//             {
//                 id: nanoid(),
//                 name: "Civil & Structural",
//                 href: "/courses?category=civil-and-structural",
//                 children: [],
//             },
//         ],
//     },
//     {
//         id: nanoid(),
//         name: "About",
//         href: "/about",
//         children: [],
//     },
//     {
//         id: nanoid(),
//         name: "Contact",
//         href: "/contact",
//         children: [],
//     },
//     {
//         id: nanoid(),
//         name: "Webinars",
//         href: "/webinars",
//         children: [],
//     },
//     {
//         id: nanoid(),
//         name: "Job Vaccancy",
//         href: "/job-vacancies",
//         children: [],
//     },
// ];

// const initialFooterMenus = [
//     {
//         id: nanoid(),
//         name: "Home",
//         href: "/",
//         children: [],
//     },
//     {
//         id: nanoid(),
//         href: "/courses",
//         name: "Courses",
//         children: [],
//     },
//     {
//         id: nanoid(),
//         name: "About",
//         href: "/about",
//         children: [],
//     },
//     {
//         id: nanoid(),
//         name: "Contact",
//         href: "/contact",
//         children: [],
//     }
// ];

// const initialFormData = {
//     id: nanoid(),
//     name: "Menu Item",
//     href: "",
//     children: [],
// };

// const extractMenuBuilderSetting = (settings: Setting[]) => {
//     const result = settings.find(val => val.code === SETTINGS.MENUBUILDER);
//     console.log({result})
//     return result;
// }

// export function MenuBuilderComponent() {
//     const {settings} = useContext(AppContext);
//     const [menus, setMenus] = useState(initialHeaderMenus);
//     const [footerMenu, setFooterMenus] = useState(initialFooterMenus);
//     const [formData, setFormData] = useState(initialFormData);
//     const [updating, setUpdating] = useState(false);
//     const [changed, setChanged] = useState(false);
//     const {toast} = useToast();

 
//     const saveSetting = async () => {
//         if(updating) return true;
//         setUpdating(true);
//         try {
//         await updateSetting("MENUBUILDER", {isChangable: true, data: {menus, footerMenu}, code: "MENUBUILDER" });
//         toast({
//             title: 'Setting Saved Successfully!',
//             variant: 'success'
//         })
//         setUpdating(false)
//         } catch (error) {
//             toast({
//                 title: 'Problem in updating setting!',
//                 variant: 'destructive'
//             })
//         }finally{
//             setUpdating(false)
//         }
//     }

//     const addMenu = () => {
//         setMenus([
//             ...menus,
//             {
//                 ...formData,
//                 id: Math.random().toString(36).substring(7),
//             },
//         ]);
//         setFormData({ id: nanoid(), name: "Menu Item", href: "", children: [] });
//     };

//     // useEffect(() => {
//     //     setMenus(extractMenuBuilderSetting(settings)?.data?.menus||[]);
//     //     setFooterMenus(extractMenuBuilderSetting(settings)?.data?.menus||[]);
//     // }, [settings])

//     useEffect(() => {
//       console.log({menus})
//     }, [menus])
    

//     return (
//         <div className="pt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
//             <Card className="">
//                 <CardHeader className="flex justify-between flex-row items-center">
//                     <CardTitle>Header Menu</CardTitle>
//                     <div className=" flex gap-3 ">
//                         <Button
//                         variant={'outline'}
//                             className=""
//                             onClick={() => {
//                                 addMenu();
//                             }}
//                             >
//                             <PlusSquareIcon className="mr-2 w-4 h-4"/>
//                             Add Menu
//                         </Button>

//                         <Button disabled={updating} onClick={() => saveSetting()}> <Save className="w-4 h-4 mr-2"/> Save</Button>
//                     </div>
//                 </CardHeader>
//                 <CardContent className="overflow-auto">
//                     <div>
//                         <MenuBuilder items={menus} setItems={setMenus} />
//                     </div>
//                 </CardContent>
//             </Card>

//             <Card className="">
//                 <CardHeader className="flex justify-between flex-row items-center">
//                     <CardTitle>Footer Menu</CardTitle>
//                     <div className="">
//                     <Button
//                         variant={'outline'}
//                             className=""
//                             onClick={() => {
//                                 addMenu();
//                             }}
//                             >
//                             <PlusSquareIcon className="mr-2 w-4 h-4"/>
//                             Add Menu
//                         </Button>
//                     </div>
//                 </CardHeader>
//                 <CardContent className="overflow-auto">
//                     <div>
//                         <MenuBuilder items={footerMenu} setItems={setFooterMenus} />
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }