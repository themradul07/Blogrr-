import { Post } from '@/lib/types/modelTypes';
import React from 'react'
import PostListItem from './PostListItem';
import Pagination from '@/app/components/pagination';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';
type Props = {
    posts : Post[],
    totalPages : number,
    page?: number,
};

const PostList = ({posts, totalPages, page}: Props) => {

  
  return (
    <>
    <div className='grid grid-cols-8 rounded-md shadow-md m-3 py-3 justify-center items-center text-center'>
        <div className='col-span-3'>Content</div>
        <div>Date</div>
        <div>Published</div>
        <div>Likes</div>
        <div>Comments</div>
        <div></div>
        

    </div>
    {posts.map((post)=><PostListItem key={post.id} post={post} />)}
    <Pagination className='my-4' currentPage={page??1} totalPages={totalPages}/>
    </>
  )
}

export default PostList