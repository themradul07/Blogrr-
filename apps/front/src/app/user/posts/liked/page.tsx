
export const dynamic = 'force-dynamic';
import React from 'react';
import { getUserLikedPosts } from '@/lib/actions/like';
import Sidebar from '../../_components/Sidebar';
import PostCard from '@/app/components/PostCard';
import NoPosts from '../_components/NoPosts';

const UserLikedPosts = async () => {
  const likedPost = await getUserLikedPosts();
  console.log("Liked Posts:", likedPost);

  return (
    <div className="flex w-full min-h-screen">
      {/* ✅ Sidebar Section */}
      <aside className="hidden md:block w-64 bg-white border-r">
        <div className="sticky top-16 h-screen overflow-hidden">
          <Sidebar />
        </div>
      </aside>

      {/* ✅ Main Content Section */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-semibold mb-6">Liked Posts</h1>

        {likedPost.length === 0 ? (
          <NoPosts message="You haven’t liked any posts yet." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {likedPost.map((post:any) => (
              <PostCard key={post.id} {...post.post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserLikedPosts;
