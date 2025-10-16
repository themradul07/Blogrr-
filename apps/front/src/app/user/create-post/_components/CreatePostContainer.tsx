"use client"

import { saveNewPost } from "@/lib/actions/postActions"
import { useActionState, useEffect } from "react"
import UpsertPostForm from "./upsertPostForm"
import { toast } from "sonner"

const CreatePostContainer = () => {
    const [state, action] = useActionState(saveNewPost , undefined)
    
    
  return (
   <UpsertPostForm state={state} formAction={action}/>
  )
}

export default CreatePostContainer