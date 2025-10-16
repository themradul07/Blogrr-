
import { fetchUserPosts } from '@/lib/actions/postActions';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';
import React from 'react'
import NoPosts from './_components/NoPosts';
import PostList from './_components/PostList';

type Props = {
  searchParams : Promise<{[key: string]: string | string[] | undefined}>;

};
const UserPosts = async({searchParams}: Props) => {
  const {page} = await searchParams;
 
  const {totalPosts , posts} = await fetchUserPosts({
    page: page? +page:1,
    pageSize: DEFAULT_PAGE_SIZE,
    
  })

  const totalPages= Math.ceil(totalPosts / DEFAULT_PAGE_SIZE);

 
  return (
    <div>
      {(!posts || !posts.length)? <NoPosts/> : <PostList page={page ? +page : 1} posts={posts} totalPages={Math.ceil(totalPosts / DEFAULT_PAGE_SIZE)-1}/> }

    </div>
  )
}

export default UserPosts