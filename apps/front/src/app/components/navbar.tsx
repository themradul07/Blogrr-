import { getSession } from '@/lib/session'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import SignInPanel from './SignInPanel';
import Profile from './Profile';


const Navbar = async (props: PropsWithChildren) => {

    const session = await getSession();

    return (
        <>
            <div className='w-full justify-center items-center flex mx-auto'>

                <div className='flex justify-between w-full  items-center max-w-7xl'>

                    <div>

                        <h1 className='text-2xl font-bold p-2 flex justify-center items-center gap-2'>
                            <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
                            Blogrr
                        </h1>
                    </div>
                    <div className='flex flex-col md:flex-row gap-2  [&>a]:py-2 [&>a]:px-4 [&>a]:transition [&>a]:rounded-md [&>a:hover]:text-sky-500 [&>a:hover]:bg-sky-50'>
                        <Link href="/">
                            Home
                        </Link>
                        <Link href="/blog">
                            Blogs
                        </Link>
                        <Link href="/user/create-post">
                            Create Blog
                        </Link>
                        <Link href="/user/posts">
                            Dashboard
                        </Link>
                    </div>
                    <div className='[&>a]:py-2 [&>a]:px-4 [&>a]:transition [&>a]:rounded-md [&>a:hover]:text-sky-500 [&>a:hover]:bg-sky-50'>

                        {session ?
                            <Profile user={session.user} /> :
                            <SignInPanel />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar