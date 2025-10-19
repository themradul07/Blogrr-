import { fetchPostsById } from '@/lib/actions/postActions';
import Image from 'next/image';

import React from 'react'
import SanitizedContent from './components/SanitizedContent';
import Comments from './components/comments';

import { getSession } from '@/lib/session';
import Like from './components/like';
import RelatedPosts from './components/RelatedPosts';


type Props = {
  params: {
    id: string;
  };
}

const Postpage = async ({ params }: Props) => {
  const postId = await params.id;
  const post = await fetchPostsById(+postId);
  const session = await getSession();
  

  return (
    <main className='container w-full px-4 py-8 mt-16 bg-gray-100 flex justify-center '>
      <div className='w-5xl  flex flex-col gap-4 '>

        <div className='flex flex-col gap-4 bg-white p-4 rounded-md'>


          <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={post.thumbnail && post.thumbnail !== "" ? post.thumbnail : "/no-image.png"}
              alt={post.title || "post-thumbnail"}
              fill
              className="object-contain"
            />
          </div>

          <div>

            <h1 className='text-3xl font-semibold mb-2 '>{post.title}</h1>
            <p className='text-gray-600 text-sm'>
              By {post.author.name} | {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>

          <SanitizedContent content={post.content ?? ""} className='text-gray-700' />
          <Like postId={postId} user={session?.user} />

        </div>

        <div className='flex flex-col gap-4 bg-white p-4 rounded-md'>

          <Comments user={session?.user} postId={+postId} />
        </div>

        <div className='flex flex-col gap-4 bg-white p-4 rounded-md'>

          <RelatedPosts postId={+postId} />
        </div>
      </div>


    </main>
  )
}

export default Postpage