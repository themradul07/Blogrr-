import {  fetchPostsById } from "@/lib/actions/postActions";
import UpdatePostContainer from "./components/UpdatePostContainer";


type Props = {
  params: {
    id: string;
  };
};
const UpdatePostPage = async (props: Props) => {
  const params = await props.params;
  const post = await fetchPostsById(parseInt(params.id));
  return (
    <div className="mt-4 max-w-2xl w-full m-auto flex gap-6 flex-col pb-12 p-2 ">
      <h2 className=" font-semibold text-3xl text-slate-700">
        Update Post
      </h2>
      <div className=' shadow-md rounded-md p-6 bg-white'>

      <UpdatePostContainer post={post}/>
      </div>
    </div>
  );
};

export default UpdatePostPage;