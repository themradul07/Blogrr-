import { fetchPostsById } from "@/lib/actions/postActions";
import UpdatePostContainer from "./components/UpdatePostContainer";

type Props = {
  params: Promise<{
    id: string;
  }>;
};


const UpdatePostPage = async ({ params }: Props) => {
  const resultOfParams = await params;
  const postId = parseInt( resultOfParams.id, 10);

  if (isNaN(postId)) {
    // Handle invalid ID gracefully
    return <p className="text-red-600 text-center mt-8">Invalid post ID</p>;
  }

  const post = await fetchPostsById(postId);

  // Handle error if fetchPostsById returns { error: string }
  if ("error" in post) {
    return <p className="text-red-600 text-center mt-8">Failed to load post: {post.error}</p>;
  }

  return (
    <div className="mt-4 max-w-2xl w-full m-auto flex gap-6 flex-col pb-12 p-2">
      <h2 className="font-semibold text-3xl text-slate-700">Update Post</h2>
      <div className="shadow-md rounded-md p-6 bg-white">
        <UpdatePostContainer post={post} />
      </div>
    </div>
  );
};

export default UpdatePostPage;
