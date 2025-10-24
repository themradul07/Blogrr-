"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "@/lib/actions/postActions";
import { getAllTags } from "@/lib/actions/tags";
import BlogCard from "./_components/BlogsCard";
import Pagination from "./components/Pagination";
import BlogSearch from "./components/BlogSearch";
import BlogFilter from "./components/BlogFilter";
import { suggestedUsers } from "@/lib/actions/userActions";

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

    const { data: UsersList } = useQuery({
    queryKey: ["GetAllUsers"],
    queryFn: () => suggestedUsers(),
  });

 


  if (isError)
    return (
      <div className="w-full text-center text-xl mt-32 text-red-600">
        {(error as Error).message || "Failed to fetch posts."}
      </div>
    );



  return (
    <div className="mt-2 md:mt-16 flex flex-col md:flex-row gap-8 p-6 min-h-screen">
      <div className="hidden md:block space-y-6 sticky top-24 h-fit max-w-2/12 ">

        <BlogFilter
          tagsList={TagList ?? []}
          selectedTags={tags}
          setSelectedTags={setTags}
        />
      </div>
      <div className="w-full md:w-3/6 space-y-4 ">

        <h2 className="text-3xl font-semibold">All Blogs</h2>

        <div className="md:hidden w-full md:w-3/12">
          <div className="space-y-6 sticky top-24 h-fit">
            <BlogSearch users={UsersList??[]} search={search} setSearch={setSearch} />
          </div>
        </div>

        <div className="grid grid-cols-1 max-w-xl gap-6 grow">

          {isLoading ? <p className="w-full text-center text-xl mt-32">Loading posts...</p>
            : data?.length===0 ? <p>No Blogs Found</p>
             :
            data?.map((post: any) => (
              <BlogCard link="" key={post.id} post={post} />
            ))}
        </div>


        <Pagination page={page} setPage={setPage} />
      </div>

      <div className="hidden md:block w-full md:w-3/12">
        <div className="space-y-6 sticky top-24 h-fit">
          <BlogSearch users={UsersList} search={search} setSearch={setSearch} />

        </div>
      </div>
    </div>
  );
};

export default BlogsView;
