import { Bars3Icon } from '@heroicons/react/16/solid'

import React, { PropsWithChildren } from 'react'
import Sidebar from './ui/sidebar'


const MobileNavbar = (props: PropsWithChildren) => {
    return (
        <div className=' md:hidden'>
            <Sidebar
                triggerIcon={<Bars3Icon className='w-4' />}
                triggerClassName='absolute top-2 left-2'
            >
                {props.children}
            </Sidebar>
        </div>
    )
}

export default MobileNavbar