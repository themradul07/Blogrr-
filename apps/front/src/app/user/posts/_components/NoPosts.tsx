import { Button } from '@/app/components/ui/button'
import { MagnifyingGlassIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

const NoPosts = ({message}: {message?:string}) => {
  return (
    <div className='mt-32 flex flex-col items-center gap-5'>
        <p className='text-center p-4 text-5xl text-slate-400' >No Post Yet</p>
        {message ?
         <Button asChild>
            <Link href={'/blog'}>
            <span>
                <MagnifyingGlassIcon className='w-4'/>
            </span>
            <span>
                Please Like some Post
            </span>
            </Link>
        </Button>
        : 
        
        
        <Button asChild>
            <Link href={'/user/create-post'}>
            <span>
                <PencilSquareIcon className='w-4'/>
            </span>
            <span>
                Write Your First Post
            </span>
            </Link>
        </Button>}
    </div>
  )
}

export default NoPosts