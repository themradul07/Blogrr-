import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

import React, { useActionState, useEffect } from 'react'
import SubmitButton from './SubmitButton'
import { SessionUser } from '@/lib/session'
import { saveComments } from '@/lib/actions/commentActions'
import { toast } from 'sonner'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

type Props = {
    postId: number;
    user: SessionUser;
    className: string;
    refetch : (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<{
    comments: any;
    count: any;
}, Error>>
}

const AddComment = (props: Props) => {
    const [state , action ] = useActionState(saveComments, undefined );

    useEffect(() => {   
        if(state?.message)
        toast(
            state?.ok ? "Success" : "Oops something went wrong",
            { description: state?.ok ? "Comment Added successfully" : "Failed to add the comment" }
        );
        if(state?.ok) props.refetch();
      
    }, [state])
    



    return (
        <div className='z-10'>



            <Dialog open={state?.open}>



                <DialogTrigger asChild>
                    <Button>
                        Leave Your Comment
                    </Button>
                </DialogTrigger>
                <DialogContent>
                        <DialogTitle>Write Your Comment</DialogTitle>
                    <form action={action} className={cn(props.className)}>
                        <input type="text" name='postId' defaultValue={props.postId} className='hidden'/>

                        <Label htmlFor="comment">Your Comment</Label>
                        <div className='border-t border-x rounded-t-md '>

                        <Textarea name='content' className='border-none active:outline-none focus-visible:ring-0 shadow-none'/>
                        {!!state?.errors?.content && (
                            <p className='text-red-500 animate-shake'>{state.errors.content}</p>
                        )}
                        <p className='border rounded-b-md p-2'>
                            <span className='text-slate-500'>Write as  </span>
                            <span className='text-slate-700'>{props.user.name}</span>
                        </p>
                        </div>

                        <SubmitButton className='mt-2'>Submit</SubmitButton>

                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddComment