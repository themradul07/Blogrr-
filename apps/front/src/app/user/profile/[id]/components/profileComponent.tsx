"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import BlogCard from "@/app/blog/_components/BlogsCard";
import { addFollower, isFollowing, removeFollower } from "@/lib/actions/userActions";
import { Post } from "@/lib/types/modelTypes";
import React from "react";

type UserProfileProps = {
  id: number;
  coverImageUrl?: string;
  profileImageUrl?: string;
  name: string;
  bio: string;
  posts: Post[];
};

export default function ProfilePage({
  id,
  coverImageUrl = "https://picsum.photos/1200/400?random=10",
  profileImageUrl = "/default-avatar.png",
  name,
  bio,
  posts,
}: UserProfileProps) {
  const queryClient = useQueryClient();

  // Query: get current follow state
  const { data: following, isLoading } = useQuery({
    queryKey: ["isFollowing", id],
    queryFn: async () => await isFollowing(id),
  });

  // Follow mutation
  const followMutation = useMutation({
    mutationFn: async () => await addFollower(id),
    onSuccess: () => {
      toast.success("Followed successfully");
      queryClient.invalidateQueries({ queryKey: ["isFollowing", id] });
    },
    onError: () => toast.error("Failed to follow"),
  });

  // Unfollow mutation
  const unfollowMutation = useMutation({
    mutationFn: async () => await removeFollower(id),
    onSuccess: () => {
      toast.info("Unfollowed successfully");
      queryClient.invalidateQueries({ queryKey: ["isFollowing", id] });
    },
    onError: () => toast.error("Failed to unfollow"),
  });

  const handleFollowToggle = () => {
    if (following) unfollowMutation.mutate();
    else followMutation.mutate();
  };

  return (
    <div className="max-w-screen-lg w-full mx-auto bg-white shadow rounded-lg overflow-hidden mt-6 sm:mt-10 transition-all">
      {/* Cover Image */}
      <div
        className="relative h-40 sm:h-56 md:h-64 lg:h-80 bg-center bg-cover"
        style={{ backgroundImage: `url(${coverImageUrl})` }}
      >
        {/* Profile Image */}
        <div className="absolute -bottom-12 sm:-bottom-16 left-1/2 sm:left-10 transform -translate-x-1/2 sm:translate-x-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-lg">
          <img
            src={profileImageUrl??"/avatar-default.jpg"}
            alt={`${name} profile`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* User Info Section */}
      <div className="pt-16 sm:pt-20 px-6 sm:px-10 pb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold">{name}</h1>
          <p className="mt-2 text-gray-600 text-sm sm:text-base max-w-xl">
            {bio || "No bio provided"}
          </p>
        </div>

        <button
          onClick={handleFollowToggle}
          disabled={
            isLoading ||
            followMutation.isPending ||
            unfollowMutation.isPending
          }
          className={`w-full sm:w-auto py-2 px-4 sm:px-6 rounded-full transition font-medium text-sm sm:text-base ${
            following
              ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
              : "bg-blue-600 text-white hover:bg-blue-700"
          } ${
            (followMutation.isPending || unfollowMutation.isPending) &&
            "opacity-70 cursor-not-allowed"
          }`}
        >
          {isLoading
            ? "Loading..."
            : followMutation.isPending || unfollowMutation.isPending
            ? "Processing..."
            : following
            ? "Following"
            : "Follow"}
        </button>
      </div>

      {/* Posts Section */}
      <div className="border-t px-6 sm:px-10 py-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left">
          Blogs
        </h2>
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center sm:text-left">
            No blogs to display.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
            {posts.map((post: Post) => (
              <BlogCard
                key={post.id}
                link={`/posts/${post.id}`}
                post={post}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
