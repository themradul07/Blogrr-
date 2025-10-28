import { Post } from '@/lib/types/modelTypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  post: Post
}

const FeaturedPost = ({ post }: Props) => {
    
  return (
    <Link href={`/blog/${post.slug}/${post.id}`}>
    <div className="max-w-5xl w-full bg-white rounded-lg h-96 flex overflow-hidden shadow-md">
      
      {/* Left: Thumbnail */}
      <div className="w-2/5 relative">
        <Image
          src={!post.thumbnail || post.thumbnail===""?"no-image.png":post.thumbnail}
          alt={post.title}
          fill
          className="object-cover"
          priority
          />
      </div>

      {/* Right: Content */}
      <div className="w-3/5 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-600 h-[60%] overflow-clip">{post.content}</p>
        </div>

        <div className="text-sm text-gray-500">
          By <span className="font-medium">{post.author?.name ?? 'Unknown'}</span>
        </div>
      </div>
    </div>
          </Link>
  )
}

export default FeaturedPost
