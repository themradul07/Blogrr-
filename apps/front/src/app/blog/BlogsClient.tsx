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

  const { data, isLoading } = useQuery({
    queryKey: ["GetAllPosts", { search, tags, page }],
    queryFn: () => getAllPosts({ search, tags, page }),
  });

  const { data: TagList } = useQuery({
    queryKey: ["GetAllTags"],
    queryFn: () => getAllTags(),
  });
  console.log(TagList)
  return (
    <div className="mt-16 flex flex-col md:flex-row gap-8 p-6 min-h-screen">
      {/* Left Section */}
      <div className="w-full md:w-3/4 space-y-4">
        <h2 className="text-3xl font-semibold">All Blogs</h2>

        {isLoading && (
          <p className="w-full text-center text-xl mt-32">Loading posts...</p>
        )}

        {!isLoading && data?.length === 0 && (
          <p className="w-full text-center text-xl mt-32">No Blogs Found.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 grow">
          {data?.map((post: any) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <Pagination page={page} setPage={setPage} />
      </div>

      {/* Right Sidebar */}
      <div className="w-full md:w-1/4">
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
