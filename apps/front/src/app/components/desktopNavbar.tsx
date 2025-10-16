"use client"
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import path from 'path';
import React, { PropsWithChildren, useEffect, useState } from 'react'


const DesktopNavbar =  (props: PropsWithChildren) => {
    const [scrollPosition, setscrollPosition] = useState(0);

    const handlescroll = ()=>{
        setscrollPosition(window.scrollY);
    }

    const pathname = usePathname();
    useEffect(()=>{
        window.addEventListener('scroll', handlescroll);
        return ()=>{
            window.removeEventListener("scroll",handlescroll)
        }
    });

    const isScrollDown = scrollPosition>10;
    const isHome = pathname==='/';
  return (
    <nav className={cn('hidden fixed transition-colors w-full z-50 text-white top-0 md:block ',
         {"bg-white text-gray-700 shadow:md":isScrollDown||!isHome,

         })}>
        <div className='flex items-center px-4 py-4 container'>
            {props.children}
        </div>
        <hr className='border-b border-gray-100 opacity-50'/>
    </nav>
  )
}

export default DesktopNavbar;