import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { SessionUser } from '@/lib/session'
import { ArrowRightStartOnRectangleIcon, ListBulletIcon, PencilSquareIcon, UserIcon } from '@heroicons/react/16/solid';
import { PopoverTrigger } from '@radix-ui/react-popover';
import Link from 'next/link';
import React from 'react'

type Props = {
    user : SessionUser;
}

const Profile = ({user}:Props) => {

  return (
    <Popover>
        <PopoverTrigger>
            <Avatar>
          <AvatarImage
            className="rounded-full w-14 border-2 border-white"
            src={user.avatar}
          />
          <AvatarFallback>
            <UserIcon className="w-8 text-slate-500" />
          </AvatarFallback>
        </Avatar>
        </PopoverTrigger>
        <PopoverContent className='w-52'>
           
      <div className='text-sm'>
      {/* User Info */}
      <div className="flex gap-3 items-center mb-5 border-b pb-3 ">
        <div className="flex justify-center items-center bg-sky-100 text-sky-600 w-10 h-10 rounded-full font-semibold">
          {user.name?.charAt(0)?.toUpperCase()}
        </div>
        <div>
        
          <p className="text-gray-800 font-semibold">{user.name}</p>
       
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <Link
          href="/user/create-post"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sky-500 hover:text-white transition"
          >
          <PencilSquareIcon className="w-5" />
          <span>Create New Post</span>
        </Link>

        <Link
          href="/user/posts"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sky-500 hover:text-white transition"
          >
          <ListBulletIcon className="w-5" />
          <span>My Posts</span>
        </Link>

        <a
          href="/api/auth/signout"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-500 hover:text-white transition"
          >
          <ArrowRightStartOnRectangleIcon className="w-5" />
          <span>Sign Out</span>
        </a>
      </div>
    
          </div>
        </PopoverContent>
    </Popover>
  )
}

export default Profile