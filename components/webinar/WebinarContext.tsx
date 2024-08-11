'use client'
import { Webinar } from "@/types"
import { createContext, useState } from "react";

export type WebinarContextType = {
    currentWebinar?: Webinar;
    setWebinar: (webinar: Webinar) => void;
}


export const context = createContext({} as WebinarContextType);

export const WebinarContextProvider = ({children}: {children: any}) => {
    const [currentWebinar, setWebinar] = useState<Webinar|undefined>();
    return <context.Provider value={{currentWebinar, setWebinar}}>{children}</context.Provider>
}