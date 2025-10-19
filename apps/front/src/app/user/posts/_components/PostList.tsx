import { Post } from '@/lib/types/modelTypes';
import React from 'react'
import PostListItem from './PostListItem';
import Pagination from '@/app/components/pagination';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';
import PostActions from './PostActions';
import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/16/solid';
type Props = {
    posts : Post[],
    totalPages : number,
    page?: number,
};

const PostList = ({posts, totalPages, page}: Props) => {

  
  return (
    <>
    {/* <div className='grid grid-cols-8 rounded-md shadow-md m-3 py-3 justify-center items-center text-center '>
        <div className='col-span-3'>Content</div>
        <div>Date</div>
        <div>Published</div>
        <div>Likes</div>
        <div>Comments</div>
        <div></div>
        

    </div>
    {posts.map((post)=><PostListItem key={post.id} post={post} />)}
    <Pagination className='my-4' currentPage={page??1} totalPages={totalPages}/> */}
    <div className="bg-white shadow-md rounded-lg p-6 justify-center items-center w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">My Recent Posts</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          <Link href={'/user/create-post'} className='flex gap-2 justify-center items-center'>
          <PlusCircleIcon className='w-6'/> 
          <p>
            Create New Blog
            </p>
          </Link>
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 text-gray-600 text-sm uppercase">
            <th className="py-3 px-4 text-left font-medium">Title</th>
            <th className="py-3 px-4 text-left font-medium">Status</th>
            {/* <th className="py-3 px-4 text-left font-medium">Views</th> */}
            <th className="py-3 px-4 text-left font-medium">Likes</th>
            <th className="py-3 px-4 text-left font-medium">Comments</th>
            <th className="py-3 px-4 text-left font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post, index) => (
            <tr
              key={index}
              className="border-t hover:bg-gray-50 transition text-gray-700"
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
                  {post.published?"Published":"Draft"}
                </span>
              </td>

              {/* <td className="py-3 px-4">122</td> */}
              <td className="py-3 px-4">{post._count.likes}</td>
              <td className="py-3 px-4">{post._count.comments}</td>

              <td className="py-3 px-4 space-x-3">
                {/* <button className="text-blue-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button> */}
                <PostActions postId={post.id}/>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default PostList



// import React from "react";

// const posts = [
//   {
//     title: "The Art of Storytelling",
//     status: "Published",
//     views: "2,345",
//     likes: "876",
//     comments: "234",
//   },
//   {
//     title: "Tech Trends in 2024",
//     status: "Draft",
//     views: "1,234",
//     likes: "567",
//     comments: "123",
//   },
//   {
//     title: "Sustainable Living Tips",
//     status: "Published",
//     views: "3,456",
//     likes: "987",
//     comments: "345",
//   },
//   {
//     title: "Creative Writing Prompts",
//     status: "Draft",
//     views: "876",
//     likes: "432",
//     comments: "87",
//   },
//   {
//     title: "Travel Diaries: Europe",
//     status: "Published",
//     views: "4,567",
//     likes: "1,098",
//     comments: "456",
//   },
// ];

// const PostsTable = () => {
//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-semibold text-gray-800">My Recent Posts</h2>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
//           Create New Post
//         </button>
//       </div>

//       <table className="w-full border-collapse">
//         <thead>
//           <tr className="bg-gray-50 text-gray-600 text-sm uppercase">
//             <th className="py-3 px-4 text-left font-medium">Title</th>
//             <th className="py-3 px-4 text-left font-medium">Status</th>
//             <th className="py-3 px-4 text-left font-medium">Views</th>
//             <th className="py-3 px-4 text-left font-medium">Likes</th>
//             <th className="py-3 px-4 text-left font-medium">Comments</th>
//             <th className="py-3 px-4 text-left font-medium">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {posts.map((post, index) => (
//             <tr
//               key={index}
//               className="border-t hover:bg-gray-50 transition text-gray-700"
//             >
//               <td className="py-3 px-4">{post.title}</td>

//               <td className="py-3 px-4">
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                     post.status === "Published"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-yellow-100 text-yellow-700"
//                   }`}
//                 >
//                   {post.status}
//                 </span>
//               </td>

//               <td className="py-3 px-4">{post.views}</td>
//               <td className="py-3 px-4">{post.likes}</td>
//               <td className="py-3 px-4">{post.comments}</td>

//               <td className="py-3 px-4 space-x-3">
//                 <button className="text-blue-600 hover:underline">Edit</button>
//                 <button className="text-red-600 hover:underline">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PostsTable;
