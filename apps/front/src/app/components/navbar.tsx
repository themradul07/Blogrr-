import { getSession } from '@/lib/session'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import SignInPanel from './SignInPanel';
import Profile from './Profile';


const Navbar = async (props: PropsWithChildren) => {

    const session = await getSession();

    return (
        <>
            <h1 className='text-2xl font-bold p-2'>My Mordern Blog</h1>
            <div className='flex flex-col md:flex-row gap-2 ml-auto [&>a]:py-2 [&>a]:px-4 [&>a]:transition [&>a]:rounded-md [&>a:hover]:text-sky-500 [&>a:hover]:bg-sky-50'>
                <Link href="/">
                    Blog
                </Link>
                <Link href="#about">
                    About
                </Link>
                <Link href="#contact">
                    Contact
                </Link>
                {session? 
                <Profile user={session.user}/> :
                <SignInPanel/>
                }
            </div>
        </>
    )
}

export default Navbar