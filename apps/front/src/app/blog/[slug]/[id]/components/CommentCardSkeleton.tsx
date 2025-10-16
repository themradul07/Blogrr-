import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const CommentCardSkeleton = () => {
  return (
    <div className=' flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
            <Skeleton className='rounded-full w-8 h-8'/>
            <Skeleton className='h-4 w-48'/>
        </div>
        <Skeleton className='h-8 w-96'/>
    </div>
  )
}

export default CommentCardSkeleton