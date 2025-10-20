import React from 'react'
import UpsertPostForm from './_components/upsertPostForm'
import CreatePostContainer from './_components/CreatePostContainer'

const CreatePost = () => {
  return (
    <div className="md:mt-4 px-2  max-w-2xl w-full m-auto flex gap-6 flex-col pb-12 ">
      <h2 className=" font-semibold text-3xl text-slate-700">
        Create a New Post
      </h2>
      <div className=' shadow-md rounded-md p-6 bg-white'>

      <CreatePostContainer/>
      </div>
    </div>
  )
}

export default CreatePost