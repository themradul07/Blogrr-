"use client";

import BlogCard from "@/app/blog/_components/BlogsCard";
import Pagination from "@/app/blog/components/Pagination";
import { getFollowingPosts } from "@/lib/actions/postActions";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const FollowingPage = () => {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["GetFollowingPosts", { page }],
    queryFn: async () => {
      const res = await getFollowingPosts(page);
      if ("error" in res) throw new Error(res.error);
      return res;
    },
  });

  return (
    <div className="w-full mx-auto mt-8 px-4 sm:px-6 md:px-10 space-y-6 min-h-screen max-w-2xl ">
      {/* Page Heading */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-center sm:text-left">
        Following Page
      </h2>

      {/* Conditional Rendering */}
      {isLoading ? (
        <p className="text-center text-lg sm:text-xl mt-32">Loading posts...</p>
      ) : data?.length === 0 ? (
        <p className="text-center sm:text-left text-gray-600 text-base sm:text-lg">
          No Blogs Found. Please follow some users.
        </p>
      ) : (
        // Responsive Grid Layout
        <div className="grid grid-cols-1 gap-6">
          {data?.map((post: any) => (
            <div key={post.id} className="flex justify-center">
              <BlogCard link="" post={post} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center sm:justify-end py-8">
        <Pagination page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default FollowingPage;
