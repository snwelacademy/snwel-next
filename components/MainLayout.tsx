
import MainNavbar from './navbar/MainNavbar'
import Footer from './footer'
import React, { ReactNode } from 'react'
import {cn} from '../lib/utils'
const MainLayout = ({
    children
}: {
    children: ReactNode
}) => {

    return (
        <div className='relative'>
            {/* <TopStrip /> */}
            <nav className={cn([
                'bg-transparent z-50 sticky top-0 ',
            ])}>
                <MainNavbar />
            </nav>

            <div>
                {children}
            </div>

            <footer className='bg-primary/20'><Footer /></footer>
        </div>
    )
}

export default MainLayout