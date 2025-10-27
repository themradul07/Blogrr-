import { fetchPostsById } from '@/lib/actions/postActions';
import Image from 'next/image';
import React from 'react';
import SanitizedContent from './components/SanitizedContent';
import Comments from './components/comments';
import { getSession } from '@/lib/session';
import Like from './components/like';
import RelatedPosts from './components/RelatedPosts';
import Link from 'next/link';

const Postpage = async ({ params }: { params: any }) => {
  const postId = params.id;
  const post = await fetchPostsById(+postId);
  const session = await getSession();


  // handle API error case
  if ('error' in post) {
    return (
      <main className='container w-full px-4 py-8 mt-2 md:mt-16 bg-gray-100 flex justify-center'>
        <div className='bg-white w-full md:w-2/3 p-8 rounded-md text-center shadow-md'>
          <h1 className='text-3xl font-semibold text-red-600 mb-4'>Something went wrong</h1>
          <p className='text-gray-600'>{post.error}</p>
        </div>
      </main>
    );
  }

  // normal post rendering
  return (
    <main className='container w-full px-4 py-8 mt-2 md:mt-16 bg-gray-100 flex justify-center'>
      <div className='w-5xl flex flex-col gap-4'>
        <div className='flex flex-col gap-4 bg-white p-4 rounded-md'>
          <div className='relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden'>
            <Image
              src={post.thumbnail && post.thumbnail !== '' ? post.thumbnail : '/no-image.png'}
              alt={post.title || 'post-thumbnail'}
              fill
              className='object-contain'
            />
          </div>

          <div>
            <h1 className="text-3xl font-semibold mb-2">{post.title}</h1>
            <Link href={`/user/profile/${post.author.id}`}>

            <div className="flex items-center text-gray-600 text-sm space-x-2">
              {/* Avatar */}
              <img
                src={post.author.avatar===undefined || post.author.avatar===""? "/avatar-default.jpg": post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />

              {/* Author name and date */}
              <p>
                By <span className="font-medium text-gray-800">{post.author.name}</span> |{" "}
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
            </Link>
          </div>


          <SanitizedContent content={post.content ?? ''} className='text-gray-700' />
          <Like postId={postId} user={session?.user} />
        </div>

        {<div className='flex flex-col gap-4 bg-white p-4 rounded-md' id='comment'>
          <Comments user={session?.user} postId={+postId} />
        </div>}

        <div className='flex flex-col gap-4 bg-white p-4 rounded-md'>
          <RelatedPosts postId={+postId} />
        </div>
      </div>
    </main>
  );
};

export default Postpage;
