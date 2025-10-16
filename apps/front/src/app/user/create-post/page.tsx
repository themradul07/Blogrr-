import React from 'react'
import UpsertPostForm from './_components/upsertPostForm'
import CreatePostContainer from './_components/CreatePostContainer'

const CreatePost = () => {
  return (
    <div className="bg-white shadow-md rounded-md p-6 max-w-2xl w-full m-auto">
      <h2 className="text-lg text-center font-bold text-slate-700">
        Create a New Post
      </h2>
      <CreatePostContainer/>
    </div>
  )
}

export default CreatePost