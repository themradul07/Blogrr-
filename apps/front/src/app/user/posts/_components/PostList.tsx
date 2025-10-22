import { Post } from "@/lib/types/modelTypes";
import React from "react";
import PostActions from "./PostActions";
import Pagination from "@/app/components/pagination";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/16/solid";

type Props = {
  posts: Post[];
  totalPages: number;
  page: number;
};

const PostList = ({ posts, totalPages, page }: Props) => {
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4 mt-2 md:mt-0 md:p-6 w-full overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 text-center md:text-left">
            My Recent Posts
          </h2>

          <Link
            href={"/user/create-post"}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex justify-center items-center gap-2 w-full md:w-auto"
          >
            <PlusCircleIcon className="w-5 md:w-6" />
            <p className="text-sm md:text-base">Create New Blog</p>
          </Link>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs md:text-sm uppercase">
                <th className="py-3 px-4 text-left font-medium">Title</th>
                <th className="py-3 px-4 text-left font-medium">Status</th>
                <th className="py-3 px-4 text-left font-medium">Likes</th>
                <th className="py-3 px-4 text-left font-medium">Comments</th>
                <th className="py-3 px-4 text-left font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {posts.map((post, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition text-gray-700 text-sm md:text-base"
                >
                  <td className="py-3 px-4">{post.title}</td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        post.published
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>

                  <td className="py-3 px-4">{post._count.likes}</td>
                  <td className="py-3 px-4">{post._count.comments}</td>

                  <td className="py-3 px-4 space-x-3">
                    <PostActions postId={post.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Centered */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <Pagination currentPage={page} totalPages={totalPages} />
          </div>
        )}
      </div>
    </>
  );
};

export default PostList;
