"use client"
import SubmitButton from "@/app/components/SubmitButton";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PostFormState } from "@/lib/types/formState";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
    postId?:number,
    state: PostFormState,
    formAction:(payload:FormData)=>void

}

const UpsertPostForm = ({state, formAction, postId}:Props) => {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        console.log("this the value of the state", state);
      if(state?.message)
        toast(state?.ok? "Succesfully Completed": "Oops Something went wrong" ,
          {description : state.message}
        )      
    }, [state])

  return (
    <form action={formAction} className="flex flex-col gap-3 [&>div>label]:text-slate-500 [&>div>input]:transition [&>div>textarea]:transition ">
        <input type="number" name="postId" defaultValue={state?.data?.postId}  hidden/>
        <div>
            <label htmlFor="title">Title</label>
            <Input name="title" placeholder="Enter The Title of Your Post" defaultValue={state?.data?.title}/>
        </div>
        {!!state?.errors?.title && (
            <p className="text-red-500 animate-shake"> {state.errors.title}</p>
        )}

        <div>
            <label htmlFor="content"> Content</label>
            <Textarea 
                name="content" 
                placeholder="Write Your Post Content here"
                rows={6}  
                defaultValue={state?.data?.content}  
            />
        </div>
        {!!state?.errors?.content && (
            <p className="text-red-500 animate-shake"> {state.errors.content}</p>
        )}

        <div>
            <label htmlFor="thumbnail">Content</label>
            <Input 
                type="file" 
                name="thumbnail" 
                accept="image/*"
                onChange={(e)=>{
                    if(e.target.files)
                        setImageUrl(URL.createObjectURL(e.target.files[0]))
                }}
              
            />
            {(!!imageUrl || !!state?.data?.previousThumbnailUrl ) && 
                <Image src={imageUrl|| state?.data?.previousThumbnailUrl || "" } alt= "post thumbnail"  width={200} height={150}/>}
        </div>
        {!!state?.errors?.thumbnail && (
            <p className="text-red-500 animate-shake"> {state.errors.thumbnail}</p>
        )}

        <div>
            <label htmlFor="tags">Tags(comma-separted)</label>
            <Input name="tags" placeholder="Enter tags (comma-separated)" defaultValue={state?.data?.tags}/>
        </div>
        {!!state?.errors?.tags && (
            <p className="text-red-500 animate-shake"> {state.errors.tags}</p>
        )}

         <div className="flex items-center">
            <input className="mx-2 w-4 h-4" type="checkbox" name="published" defaultChecked={state?.data?.published==="on"?true:false} />
            <label htmlFor="checkbox">Publish Now</label>
        </div>
        {!!state?.errors?.isPublished && (
            <p className="text-red-500 animate-shake"> {state.errors.isPublished}</p>
        )}

        <SubmitButton>Save</SubmitButton>

    </form>
  )
}

export default UpsertPostForm;