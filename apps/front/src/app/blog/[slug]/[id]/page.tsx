import { fetchPostsById } from '@/lib/actions/postActions';
import Image from 'next/image';

import React from 'react'
import SanitizedContent from './components/SanitizedContent';
import Comments from './components/comments';
import AddComment from '@/app/components/addComment';
import { getSession } from '@/lib/session';
import Like from './components/like';

type Props = {
    params : {
        id: string;
    };
}

const Postpage = async ({params}: Props) => {
    const postId = await params.id;
    const post = await fetchPostsById(+postId);
    const session = await getSession();

  return (
    <main className='container mx-auto px-4 py-8 mt-16'>
        <h1 className='text-4xl font-bold mb-4 text-slate-700'>{post.title}</h1>
        <p>
          By {post.author.name} | {new Date(post.createdAt).toLocaleString()} 
        </p>

        <div>
          <Image 
            src={post.thumbnail??"/no-image.png"}
            alt='post-title'
            fill
            className='rounded-md object-cover'
          />
        </div>

        <SanitizedContent content={post.content??""} className=''/>
        <Like postId={postId} user={session?.user} />
        
        <Comments user={session?.user} postId={+postId} />

    </main>
  )
}

export default Postpage