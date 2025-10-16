"use client"
import { getPostLikedData, likePost, unlikePost } from '@/lib/actions/like';
import { SessionUser } from '@/lib/session';
import { useMutation, useQuery } from '@tanstack/react-query';
import {HeartIcon} from '@heroicons/react/24/outline'

import React from 'react'

type Props = {
    postId: number;
    user?: SessionUser
}

const Like = (props: Props) => {
    const {data, refetch:refetchPostLikeData} = useQuery({
        queryKey : ["GET_POST_LIKE_DATA", props.postId],
        queryFn : async ()=> await getPostLikedData(props.postId),
    })

    const likeMutation = useMutation({
        mutationFn:()=>likePost(props.postId),
        onSuccess: refetchPostLikeData
        
    });
 
    const unlikeMutation = useMutation({
        mutationFn:()=>unlikePost(props.postId),
        onSuccess: refetchPostLikeData
        
    });
  return (
    <div className='mt-3 flex items-center justify-start gap-2'>
        {data?.userLikedPost?(
            <button className='z-60' onClick={()=>unlikeMutation.mutate()}>
                <HeartIcon className='w-6 cursor-pointer text-rose-600'/>
            </button>
        ):(
            <button className=' z-60 cursor-pointer' onClick={()=>likeMutation.mutate()}>
                <HeartIcon className=' w-6'/>
            </button>
        )}
        <p className='text-slate-600'>
            {data?.likeCount}
        </p>
    </div>
  )
}

export default Like