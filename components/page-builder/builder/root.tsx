'use client'

import { DefaultRootProps } from "@measured/puck"
import { ReactNode } from "react"

export type RootProps = DefaultRootProps;


function Root({ children, puck }: RootProps) {
    return (
        <>
            {children}
        </>
    )
}


export default Root;