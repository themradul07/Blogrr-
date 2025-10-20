import { Post } from '@/lib/types/modelTypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = Partial<Post>
const PostCard = ({
    id,
    title,
    slug,
    thumbnail,
    content,
    createdAt,
    author,
}: Props) => {

    return (
        <div className='bg-white rounded-lg shadow-md overflow-hidden flex flex-col'>
                <Link
                    href={`/blog/${slug}/${id}`}
                    className='flex-grow'
                >
                <div className='relative h-50 overflow-hidden bg-slate-50'>
                    <Image src={thumbnail===undefined || thumbnail===""?"/no-image.png": thumbnail} alt="Post image" fill />
                </div>
                <div className='px-4 py-2 flex-grow flex flex-col h-full '>

                    <h3 className='break-words font-semibold line-clamp-2'>{title}</h3>
                    <div className='justify-self-end'>

                    <p className='mt-2 text-gray-500 text-xs'>
                        {author?.name} ||
                        {new Date(createdAt ?? "").toLocaleDateString()}</p>
                    </div>
                    {/* <p>
                {content?.slice(0,100)}...
            </p> */}

                </div>
        </Link>
            </div>
    )
}

export default PostCard