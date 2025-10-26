"use client";
import BlogCard from '@/app/blog/_components/BlogsCard';
import Pagination from '@/app/blog/components/Pagination';
import { getFollowingPosts } from '@/lib/actions/postActions';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'

const FollowingPage = () => {
     const [page, setPage] = useState(1);
    
      const {
        data,
        isLoading,
        isError,
        error,
      } = useQuery({
        queryKey: ["GetFollowingPosts", { page }],
        queryFn: async () => {
          const res = await getFollowingPosts(page);
          // If API returns an error shape, throw to trigger React Query error handling
          if ("error" in res) throw new Error(res.error);
          return res;
        },
      });

  return (
      <div className="w-full mx-auto mt-6 md:w-3/6 space-y-4 min-h-screen"> 
    
            <h2 className="text-3xl font-semibold">Following Page</h2>
    
               
    
              {isLoading ? <p className="w-full text-center text-xl mt-32">Loading posts...</p>
                : data?.length===0 ? <p>No Blogs Found... Please Follow some users</p>
                 :
                data?.map((post: any) => (
                    <div className="grid grid-cols-2 max-w-xl gap-6 grow">
                  <BlogCard link="" key={post.id} post={post} />
            </div>
                ))}
    
    
            <Pagination page={page} setPage={setPage} />
          </div>
  )
}

export default FollowingPage