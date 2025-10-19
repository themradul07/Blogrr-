import { Post } from '@/lib/types/modelTypes'
import React from 'react'
import PostCard from './PostCard';
import Pagination from './pagination';
import FeaturedPost from './FeaturedPost';

type Props = {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  featuredPost : Post;
}

const Posts = (props: Props) => {
  return (
    <section className='container m-8 max-w-5xl mx-auto flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <div className='text-2xl font-semibold'>Featured Post</div>
        <div>

        <FeaturedPost post={props.featuredPost}/>
        </div>
      </div>
      <div className='flex flex-col gap-4'>

        <div  className='text-2xl font-semibold'>Recent Posts</div>
        <div className='grid grid-cols-1 md:grid-cols-3  gap-6 w-full mx-auto'>
          {props.posts.map((post) => <PostCard key={post.id} {...post} />)}
        </div>
        <Pagination className='mt-4' pageNeighbors={1} currentPage={props.currentPage} totalPages={props.totalPages} />
      </div>



    </section>
  )
}

export default Posts