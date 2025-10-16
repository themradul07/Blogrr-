"use client"
import { cn } from '@/lib/utils';
import React, { PropsWithChildren, ReactNode, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts';

type Props = PropsWithChildren<{
    triggerIcon: ReactNode;
    triggerClassName?: string;
}>
const Sidebar = (props: Props) => {
    const [show , setshow] = useState(false);
    const ref =useRef(null);
    useOnClickOutside(ref, ()=> setshow(false));
    
  return (
    <>
        <button onClick={()=>setshow((prev)=>!prev)}>
            {props.triggerIcon}
        </button>
        <div
        ref={ref}
        className={cn("w-60 absolute top-0 z-50 duration-300 transition-all bg-white rounded-r-md min-h-screen",{
            "-left-full":!show,
            "left-0":show
        })}>
            {props.children}
        </div>
    </>
  )
}

export default Sidebar