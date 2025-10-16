"use client"
import { Button } from '@/app/components/ui/button';
import { AlertDialogContent, AlertDialog, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel, AlertDialogAction  } from '@/components/ui/alert-dialog';
import { deletePost } from '@/lib/actions/postActions';
import { AlertDialogDescription, AlertDialogTitle } from '@radix-ui/react-alert-dialog';
import Link from 'next/link';

import React, { use } from 'react'
type Props = {
    params: Promise<{
        id:string;
    }>
};

const InterceptorDeletePostPage = (props: Props) => {
    const params = use(props.params);
  return (
    <div className='z-50'>

    <AlertDialog>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle></AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your post and remove its data and remove its data from our servers.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>
                    <a href={"/user/posts"}>Cancel</a>
                </AlertDialogCancel>
                <AlertDialogAction  asChild>
                    <Button onClick={()=>deletePost(+params.id)} variant={"destructive"}>
                        <a href="/user/posts">
                        Delete
                        </a> 
                    </Button>
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </div>
  )
}

export default InterceptorDeletePostPage
