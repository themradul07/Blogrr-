"use client";

import UpsertPostForm from "@/app/user/create-post/_components/upsertPostForm";
import { updatePost } from "@/lib/actions/postActions";
import { Post } from "@/lib/types/modelTypes";
import { useActionState } from "react";

type Props = {
  post: Post;
};
const UpdatePostContainer = ({ post }: Props) => {
  console.log({ post });
  const [state, action] = useActionState(updatePost, {
    data: {
      postId: post.id,
      title: post.title,
      content: post.content,
      published: post.published ? "on" : undefined,
      tags: post.tags?.map((tag) => tag.name).join(","),
      previousThumbnailUrl: post.thumbnail ?? undefined,
    },
  });
  return <UpsertPostForm state={state} formAction={action} />;
};

export default UpdatePostContainer;