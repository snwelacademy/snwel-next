
import { ReactNode } from "react"

export type Menu = {
    label: string,
    link?: string,
    children?: Menu[],
    icon?: ReactNode
}
