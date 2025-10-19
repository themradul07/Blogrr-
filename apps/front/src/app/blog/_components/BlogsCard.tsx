import { fetchPosts } from '@/lib/actions/postActions';
import { Post } from '@/lib/types/modelTypes';
import { NewspaperIcon, TagIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import React from 'react'



type Props = {
 post: Post
}

const BlogCard = ({post}: Props) => {

   
    return (
   
        
           <Link href={`/blog/${post.slug}/${post.id}`}>
                
           
            <div className="border rounded-xl p-3 bg-white hover:shadow-lg transition cursor-pointer flex flex-col grow h-full">
                <img
                    src={post.thumbnail===""|| post.thumbnail===undefined? '/no-image.png':post.thumbnail}
                    alt={post.title}
                    className="w-full h-54 object-cover rounded-md mb-3"
                />
                <h3 className="font-semibold text-lg flex items-center gap-2 line-clamp-2">
                    
                    {post.title.slice(0,50)}
                </h3>
                <p className="text-sm text-gray-500 mt-1 mb-3">
                     by {post.author?.name}
                </p>
                {/* <div className="flex flex-wrap gap-2 mt-auto">
                    {tags.length()!=0?tags.map((tag: any) => (
                        <span
                            key={tag}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center gap-1"
                        >
                            <TagIcon className="w-3 h-3" /> {tag}
                        </span>
                    ))}
                </div> */}
            </div>
            </Link>
          
       
    )
}

export default BlogCard