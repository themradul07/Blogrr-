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

  // Fetch follow status
  const { data: following, isLoading } = useQuery({
    queryKey: ["isFollowing", id],
    queryFn: async () => await isFollowing(id),
  });

  // Follow user mutation
  const followMutation = useMutation({
    mutationFn: async () => await addFollower(id),
    onSuccess: () => {
      toast.success("Followed successfully");
      queryClient.invalidateQueries({ queryKey: ["isFollowing", id] });
    },
    onError: () => toast.error("Failed to follow"),
  });

  // Unfollow user mutation
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
    <div className="w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden mt-6 transition-all">
      {/* Cover Image */}
      <div
        className="relative h-64 bg-center bg-cover"
        style={{ backgroundImage: `url(${coverImageUrl})` }}
      >
        {/* Profile Picture */}
        <div className="absolute -bottom-16 left-10 w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-lg">
          <img
            src={profileImageUrl}
            alt={`${name} profile`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* User info */}
      <div className="pt-20 px-10 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">{name}</h1>
          <p className="mt-2 text-gray-600 max-w-xl">{bio}</p>
        </div>

        <button
          onClick={handleFollowToggle}
          disabled={isLoading || followMutation.isPending || unfollowMutation.isPending}
          className={`mt-6 py-2 px-5 rounded-full transition font-medium ${
            following
              ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
              : "bg-blue-600 text-white hover:bg-blue-700"
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
      <div className="border-t px-10 py-6">
        <h2 className="text-2xl font-semibold mb-4">Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts to display.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {posts.map((post: Post) => (
              <BlogCard key={post.id} link={`/posts/${post.id}`} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
