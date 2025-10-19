import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CommentEntity } from '@/lib/types/modelTypes'
import { UserIcon } from '@heroicons/react/16/solid'

import React from 'react'

type Props = {
    comment: CommentEntity
}
const CommentsCard = ({ comment }: Props) => {
    return (
        <div className='p-2  rounded'>
            <div className='flex gap-4  '>
                <div>


                    <Avatar className='border-2 size-12'>
                        <AvatarImage src={comment.author.avatar} />
                        <AvatarFallback>
                            <UserIcon className='w-8' />
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div >

                    <p>{comment.author.name}
                        <span className='ml-2'>
                            {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                    </p>
                    <p className='mt-1 text-gray-700 text-sm'>{comment.content}</p>



                </div>
            </div>
        </div>
    )
}

export default CommentsCard