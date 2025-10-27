"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPostLikedData, likePost, unlikePost } from "@/lib/actions/like";
import { Post } from "@/lib/types/modelTypes";
import { timeAgo } from "@/lib/utils";
import {
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/16/solid";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

type Props = {
  post: Post;
  link?: string;
};

const BlogCard = ({ post }: Props) => {
  // Thumbnail fallback
  const thumbnail =
    post.thumbnail && post.thumbnail.trim() !== "" ? post.thumbnail : "/no-image.png";

  // Like state and mutations
  const { data, refetch: refetchPostLikeData } = useQuery({
    queryKey: ["GET_POST_LIKE_DATA", post.id],
    queryFn: () => getPostLikedData(post.id),
  });

  const likeMutation = useMutation({
    mutationFn: async () => await likePost(post.id),
    onSuccess: () => refetchPostLikeData(),
    onError: () => toast.error("Failed to like post"),
  });

  const unlikeMutation = useMutation({
    mutationFn: async () => await unlikePost(post.id),
    onSuccess: () => refetchPostLikeData(),
    onError: () => toast.error("Failed to unlike post"),
  });

  // Share handler
  const onShare = () => {
    const url = `${window.location.origin}/blog/${post.slug}/${post.id}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="rounded-xl bg-white border border-gray-200 max-w-[600px] w-full mx-auto shadow-sm hover:shadow-md transition-all h-fit">
      {/* Header */}
      <Link href={`/user/profile/${post.author?.id}`} className="block">
        <div className="flex items-start p-4">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={post.author?.avatar || ""}
              className="w-10 h-10 object-cover rounded-full"
            />
            <AvatarFallback>
              <UserIcon className="w-10 h-10 text-blue-500" />
            </AvatarFallback>
          </Avatar>
          <div className="ml-3 flex flex-col items-start">
            <span className="font-semibold text-gray-800">
              {post.author?.name || "Unknown Author"}
            </span>
            <span className="text-xs text-gray-500">
              {post.author?.bio || "Blogger • Writer"}
            </span>
            <span className="text-xs text-gray-400">{timeAgo(`post.createdAt`)}</span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <Link href={`/blog/${post.slug}/${post.id}`} className="block">
        <div className="px-5 pb-4">
          <p className="text-gray-800 text-sm sm:text-base leading-relaxed mb-3">
            {post.content?.slice(0, 140) || "No description provided."}
          </p>
          {thumbnail && (
            <div className="w-full rounded-lg h-100 bg-gray-200 overflow-hidden border flex items-center justify-center">
              <img
                src={thumbnail}
                alt="Post thumbnail"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </Link>

      {/* Stats */}
      <div className="flex items-center justify-between px-5 text-gray-500 text-xs sm:text-sm border-t py-2">
        <div className="flex items-center gap-2">
          <HeartIcon className="w-4 h-4 text-blue-600" />
          <span>{data?.likeCount ?? 0}</span>
        </div>
        <div>{data?.postCommentCount?? 0} comments</div>
      </div>

      {/* Actions */}
      <div className="flex justify-around px-2 py-3 border-t text-gray-600 text-sm">
        {data?.userLikedPost ? (
          <button
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition"
            onClick={() => unlikeMutation.mutate()}
          >
            <HeartIcon className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-600">Liked</span>
          </button>
        ) : (
          <button
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition"
            onClick={() => likeMutation.mutate()}
          >
            <HeartIcon className="w-5 h-5" />
            <span>Like</span>
          </button>
        )}

        <Link
          href={`/blog/${post.slug}/${post.id}/#comment`}
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
          <span>Comment</span>
        </Link>

        <button
          onClick={onShare}
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowUpTrayIcon className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
