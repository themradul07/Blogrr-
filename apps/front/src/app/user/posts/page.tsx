
import { fetchUserPosts } from '@/lib/actions/postActions';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';
import React from 'react'
import NoPosts from './_components/NoPosts';
import PostList from './_components/PostList';
import Sidebar from '../_components/Sidebar';
import { getUserLikedPosts } from '@/lib/actions/like';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;

};
const UserPosts = async ({ searchParams }: Props) => {
  const { page } = await searchParams;  

  const { totalPosts, posts } = await fetchUserPosts({
    page: page ? +page : 1,
    pageSize: DEFAULT_PAGE_SIZE,

  })

  const likedPost = await getUserLikedPosts();
  console.log(likedPost);

  const totalPages = Math.ceil(totalPosts / DEFAULT_PAGE_SIZE);
  const totalLikes = posts.reduce((total, post) => total + (post._count.likes || 0), 0);
const totalComments = posts.reduce((total, post) => total + (post._count.comments || 0), 0);


  return (
    <div className='flex max-h-screen w-full'>
      <div className=' max-h-screen'>
        <Sidebar />

      </div>
      <div className=' overflow-scroll p-4 w-full'>

        <h1 className='text-3xl font-semibold mb-6 '>Dashboard</h1>

        <div className='flex justify-around g-4 '>
          <div className='bg-white p-4 rounded-md m-4  flex flex-col g-6 w-1/3'>
            <p className='text-md font-semibold text-gray-700'>
              Total Posts
            </p>
            <p className='text-3xl '>
              {totalPosts}
            </p>
          </div>
          <div className='bg-white p-4 rounded-md m-4  flex flex-col g-6 w-1/3'>
            <p className='text-md font-semibold text-gray-700'>
              Total Likes
            </p>
            <p className='text-3xl '>
            {totalLikes}
            </p>
          </div>
          <div className='bg-white p-4 rounded-md m-4  flex flex-col g-6 w-1/3'>
            <p className='text-md font-semibold text-gray-700'>
              Total Comments
            </p>
            <p className='text-3xl '>
             {totalComments}
            </p>
          </div>


        </div>
        

        {(!posts || !posts.length) ? <NoPosts /> : <PostList page={page ? +page : 1} posts={posts} totalPages={Math.ceil(totalPosts / DEFAULT_PAGE_SIZE) - 1} />}
      </div>
    </div>
  )
}

export default UserPosts