"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "@/lib/actions/postActions";
import { getAllTags } from "@/lib/actions/tags";
import BlogCard from "./_components/BlogsCard";
import Pagination from "./components/Pagination";
import BlogSearch from "./components/BlogSearch";
import BlogFilter from "./components/BlogFilter";

const BlogsView = () => {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["GetAllPosts", { search, tags, page }],
    queryFn: async () => {
      const res = await getAllPosts({ search, tags, page });
      // If API returns an error shape, throw to trigger React Query error handling
      if ("error" in res) throw new Error(res.error);
      return res;
    },
  });

  const { data: TagList } = useQuery({
    queryKey: ["GetAllTags"],
    queryFn: () => getAllTags(),
  });

  if (isLoading)
    return (
      <p className="w-full text-center text-xl mt-32">Loading posts...</p>
    );

  if (isError)
    return (
      <div className="w-full text-center text-xl mt-32 text-red-600">
        {(error as Error).message || "Failed to fetch posts."}
      </div>
    );

  if (!data || data.length === 0)
    return (
      <p className="w-full text-center text-xl mt-32">No Blogs Found.</p>
    );

  return (
    <div className="mt-2 md:mt-16 flex flex-col md:flex-row gap-8 p-6 min-h-screen">
      <div className="w-full md:w-3/4 space-y-4">
        <h2 className="text-3xl font-semibold">All Blogs</h2>

        <div className="md:hidden w-full md:w-1/4">
          <div className="space-y-6 sticky top-24 h-fit">
            <BlogSearch search={search} setSearch={setSearch} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 grow">
          {data.map((post: any) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <Pagination page={page} setPage={setPage} />
      </div>

      <div className="hidden md:block w-full md:w-1/4">
        <div className="space-y-6 sticky top-24 h-fit">
          <BlogSearch search={search} setSearch={setSearch} />
          <BlogFilter
            tagsList={TagList ?? []}
            selectedTags={tags}
            setSelectedTags={setTags}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogsView;
