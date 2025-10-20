"use client"

import { cn } from '@/lib/utils'
import React, { PropsWithChildren, ReactNode, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

type Props = PropsWithChildren<{
    triggerIcon: ReactNode
    triggerClassName?: string
}>

const Sidebar = (props: Props) => {
    const [show, setShow] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useOnClickOutside(ref, () => setShow(false))

    return (
        <>
            <button
                onClick={() => setShow((prev) => !prev)}
                className={props.triggerClassName}
            >
                {props.triggerIcon}
            </button>

            <div
                ref={ref}
                onClick={(e) => {
                    // ✅ close sidebar when clicking any <button> or <a> inside
                    const target = e.target as HTMLElement
                    if (target.closest('button') || target.closest('a')) {
                        setShow(false)
                    }
                }}
                className={cn(
                    'fixed top-0 w-60 z-50 duration-300 transition-all bg-white rounded-r-md min-h-screen shadow-lg',
                    {
                        '-left-full': !show,
                        'left-0': show,
                    }
                )}
            >
                {props.children}
            </div>
        </>
    )
}

export default Sidebar
