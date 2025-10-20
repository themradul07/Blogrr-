import { Post } from '@/lib/types/modelTypes'
import React from 'react'
import PostCard from './PostCard'
import Pagination from './pagination'
import FeaturedPost from './FeaturedPost'

type Props = {
  posts: Post[]
  currentPage: number
  totalPages: number
  featuredPost: Post
}

const Posts = (props: Props) => {
  return (
    <section className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10">
      {/* Featured Post Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl sm:text-3xl font-semibold">Featured Post</h2>
        <FeaturedPost post={props.featuredPost} />
      </div>

      {/* Recent Posts Section */}
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-semibold">Recent Posts</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {props.posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Pagination
            pageNeighbors={1}
            currentPage={props.currentPage}
            totalPages={props.totalPages}
          />
        </div>
      </div>
    </section>
  )
}

export default Posts
