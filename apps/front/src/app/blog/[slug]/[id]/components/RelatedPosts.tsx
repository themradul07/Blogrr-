import PostCard from "@/app/components/PostCard";
import { getRelatedPosts } from "@/lib/actions/postActions";
import React from "react";

type Props = {
  postId: number;
};

const RelatedPosts = async ({ postId }: Props) => {
  const data = await getRelatedPosts(postId);
  

  if (!data || data.length === 0)
    return (
      <div className="p-2 rounded-md">
        <h6 className="text-2xl mb-2">Related Blogs</h6>
        <p className="text-gray-500 text-sm">No related posts found.</p>
      </div>
    );

  return (
    <div className="p-2 rounded-md">
      <h6 className="text-2xl mb-4">Related Blogs</h6>
      <div className="grid gap-4 md:grid-cols-3">
        {data?.posts.map((post:any) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
