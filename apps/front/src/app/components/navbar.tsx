import { getSession } from '@/lib/session'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import SignInPanel from './SignInPanel'
import Profile from './Profile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserIcon } from '@heroicons/react/16/solid'
import { ArrowRightEndOnRectangleIcon, ArrowRightOnRectangleIcon, HeartIcon, HomeIcon, NewspaperIcon, PencilSquareIcon, Squares2X2Icon } from '@heroicons/react/24/outline'

const Navbar = async (props: PropsWithChildren) => {
    const session = await getSession()

    return (
        <>
            <div className="w-full flex md:justify-center md:items-center">
                <div className="flex flex-col md:flex-row text-left mt-10 md:mt-1 gap-4 md:gap-0 md:justify-between md:items-center  w-full max-w-7xl">

                    <div >
                        <h1 className="text-2xl font-bold p-2 flex justify-center items-center gap-2">
                            <svg
                                className="h-8 w-8 text-primary"
                                fill="none"
                                viewBox="0 0 48 48"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6 6H42L36 24L42 42H6L12 24L6 6Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                            Blogrr
                        </h1>
                    </div>

                    <div className="hidden md:flex  flex-col md:flex-row gap-2 [&>a]:py-2 [&>a]:px-4 [&>a]:transition [&>a]:rounded-md [&>a:hover]:text-sky-500 [&>a:hover]:bg-sky-50">
                        <Link href="/">Home</Link>
                        <Link href="/blog">Blogs</Link>
                        <Link href="/user/create-post">Create Blog</Link>
                        <Link href="/user/posts">Dashboard</Link>
                    </div>
                    <div className="md:hidden flex flex-col md:flex-row gap-2 [&>a]:py-2 [&>a]:px-4 [&>a]:transition [&>a]:rounded-md [&>a:hover]:text-sky-500 [&>a:hover]:bg-sky-50">

                        <Link
                            href="/"
                            className="flex items-center gap-2 hover:text-blue-600 transition"
                        >
                            <HomeIcon className="w-3 h-3" />
                            Home
                        </Link>

                        <Link
                            href="/blog"
                            className="flex items-center gap-2 hover:text-blue-600 transition"
                        >
                            <NewspaperIcon className="w-3 h-3" />
                            Blogs
                        </Link>

                        {session?.user ?
                            <>
                                <Link
                                    href="/user/posts/liked"
                                    className="flex items-center gap-2 hover:text-blue-600 transition"
                                >
                                    <HeartIcon className="w-3 h-3" />
                                    Liked Posts
                                </Link>

                                <Link
                                    href="/user/create-post"
                                    className="flex items-center gap-2 hover:text-blue-600 transition"
                                >
                                    <PencilSquareIcon className="w-3 h-3" />
                                    Create Blog
                                </Link>

                                <Link
                                    href="/user/posts"
                                    className="flex items-center gap-2 hover:text-blue-600 transition"
                                >
                                    <Squares2X2Icon className="w-3 h-3" />
                                    Dashboard
                                </Link>
                                <a
                                    href="/api/auth/signout"
                                    className="flex items-center gap-2 hover:text-red-600 transition"
                                >
                                    <ArrowRightEndOnRectangleIcon className="w-3 h-3" />
                                    Sign Out
                                </a></> : ""}
                    </div>

                    <div className=" p-4 [&>a]:py-2 [&>a]:px-4 [&>a]:transition [&>a]:rounded-md [&>a:hover]:text-sky-500 [&>a:hover]:bg-sky-50">
                        {session ? <div>
                            <div className=' md:hidden flex items-center gap-2'>
                                <Avatar>
                                    <AvatarImage
                                        className="rounded-full w-14 border-2 border-white"
                                        src={session.user.avatar}
                                    />
                                    <AvatarFallback>
                                        <UserIcon className="w-8 text-slate-500" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className='font-semibold break-words overflow-hidden w-full'>
                                    {session.user.name}
                                </div>


                            </div>
                            <div className='hidden md:block'>

                                <Profile user={session.user} />
                            </div>
                        </div>


                            : <SignInPanel />}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Navbar
