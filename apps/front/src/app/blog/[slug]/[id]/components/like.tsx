"use client"
import { getPostLikedData, likePost, unlikePost } from '@/lib/actions/like';
import { SessionUser } from '@/lib/session';
import { useMutation, useQuery } from '@tanstack/react-query';
import { HeartIcon } from '@heroicons/react/16/solid'

import React from 'react'
import { toast } from 'sonner';

type Props = {
    postId: number;
    user?: SessionUser
}

const Like = (props: Props) => {
    const { data, refetch: refetchPostLikeData } = useQuery({
        queryKey: ["GET_POST_LIKE_DATA", props.postId],
        queryFn: async () => await getPostLikedData(props.postId),
    })
    const likeMutation = useMutation({
        mutationFn: async () => {
            try {
                return await likePost(props.postId);
            } catch (error) {
                // Throw to trigger React Query's onError
                throw error;
            }
        },
        onSuccess: () => {
            toast.success("Liked Successfully");
            refetchPostLikeData();
        },
        onError: (error) => {
            
            if (error) {
                toast.error( "Failed to like post!! Please Login");
            } 
        }
    });

    const unlikeMutation = useMutation({
        mutationFn: () => unlikePost(props.postId),
          onSuccess: () => {
            toast.success("Unliked Successfully");
            refetchPostLikeData();
        },
        onError: () => {
            toast.error("Failed to Unlike")
        }
    });
    
    return (
        <div className='mt-3 flex items-center justify-start gap-2'>
            {data?.userLikedPost ? (
                <button className='z-5' onClick={() => unlikeMutation.mutate()}>
                    <HeartIcon className='w-6 cursor-pointer text-rose-600' />
                </button>
            ) : (
                <button className=' z-5 cursor-pointer' onClick={() => likeMutation.mutate()}>
                    <HeartIcon stroke='black' className=' w-6 text-white' />
                </button>
            )}
            <p className='text-slate-600'>
                {data?.likeCount}
            </p>
        </div>
    )
}

export default Like