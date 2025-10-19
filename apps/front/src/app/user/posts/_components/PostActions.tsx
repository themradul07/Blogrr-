"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid'

import Link from 'next/link'
import React from 'react'

type Props = {
  postId: number
}


const PostActions = ({ postId }: Props) => {
  return (
    <>
      <div className='w-full flex  items-center gap-2'>
        <TooltipProvider>
          <Tooltip>
            < TooltipTrigger asChild>
              <Link className='border p-2 border-yellow-500 rounded-md text-yellow-500 hover:border-yellow-700 hover:text-yellow-700 transition-colors' href={`posts/${postId}/update`}>
                <PencilIcon className='w-4' />
              </Link>
            </TooltipTrigger>

            <TooltipContent>
              <p>Edit this post</p>
            </TooltipContent>

          </Tooltip>
        </TooltipProvider>


         <TooltipProvider>
          <Tooltip>
            < TooltipTrigger asChild>
              <a className='border p-2 border-red-500 rounded-md text-red-500 hover:border-red-700 hover:text-red-700 transition-colors' href={`posts/${postId}/delete`}>
                <TrashIcon className='w-4' />
              </a>
              
            </TooltipTrigger>

            <TooltipContent>
              <p>Delete this post</p>
            </TooltipContent>

          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  )
}

export default PostActions