import { Bars3Icon } from '@heroicons/react/16/solid'

import React, { PropsWithChildren } from 'react'
import Sidebar from './ui/sidebar'


const MobileNavbar = (props: PropsWithChildren) => {
    return (
        <div className=' md:hidden flex justify-between'>
            <div>
                <h1 className='text-2xl font-bold p-2 flex justify-center items-center gap-2'>
                    <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
                    Blogrr
                </h1>
            </div>
            <Sidebar
            
                triggerIcon={<Bars3Icon className='w-5' />}
                triggerClassName='top-2 left-2'
            >
                {props.children}
            </Sidebar>
        </div>
    )
}

export default MobileNavbar