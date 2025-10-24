import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getPostLikedData, likePost, unlikePost } from '@/lib/actions/like';
import { Post } from '@/lib/types/modelTypes';
import { timeAgo } from '@/lib/utils';
import { HeartIcon, UserIcon } from '@heroicons/react/16/solid';
import {  ChatBubbleBottomCenterTextIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';

type Props = {
    post: Post;
    link : string;
};

const BlogCard = ({ post , link }: Props) => {
    const thumbnail =
        post.thumbnail === '' || post.thumbnail === undefined
            ? '/no-image.png'
            : post.thumbnail;

    const { data, refetch: refetchPostLikeData } = useQuery({
        queryKey: ["GET_POST_LIKE_DATA", post.id],
        queryFn: async () => await getPostLikedData(post.id),
    })
    const likeMutation = useMutation({
        mutationFn: async () => {
            try {
                return await likePost(post.id);
            } catch (error) {
                // Throw to trigger React Query's onError
                throw error;
            }
        },
        onSuccess: () => {
            
            refetchPostLikeData();
        },
        onError: (error) => {
            
            if (error) {
                toast.error("Failed to like post");
            }
        }
    });

    const unlikeMutation = useMutation({
        mutationFn: () => unlikePost(post.id),
        onError: () => {
            toast.error("Failed to Unlike")
        },
        onSuccess:()=>
        {
            refetchPostLikeData()
        }
    });

    const onShare = () => {
    const url = `${window.location.origin}/blog/${post.slug}/${post.id}`;
    navigator.clipboard.writeText(url);
    toast('Link copied to clipboard!');
  }

    return (
        <div className="border bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer flex flex-col h-full w-full">

            {/* Top: Author Info */}
            <div className="flex items-center gap-3 px-4 py-2 border-b">
                <Avatar>
                    <AvatarImage
                        className="w-10 h-10 rounded-full object-cover"
                        src={post.author?.avatar}
                    />
                    <AvatarFallback>
                        <UserIcon className="w-10 h-10 rounded-full text-blue-400 object-cover" />
                    </AvatarFallback>
                </Avatar>


                <div>
                    <p className="font-medium text-gray-800">{post.author?.name || 'Unknown Author'}</p>
                    <p className="text-xs text-gray-500">
                        {timeAgo(`${post.createdAt}`)}
                    </p>
                </div>
            </div>

            {/* Middle: Post Content */}
            <Link href={`/blog/${post.slug}/${post.id}`} className="flex flex-col grow">
                <div className="px-4 py-1 flex flex-col gap-3">
                    <h3 className=" text-sm line-clamp-2 text-gray-900">
                        {post.title.slice(0, 80)}
                    </h3>
                    
                </div>

                <img
                    src={thumbnail}
                    alt={post.title}
                    className="w-full max-h-80 object-cover"
                />
            </Link>

            {/* Bottom: Action Buttons */}
            <div className="flex justify-around items-center py-3 border-t text-gray-600 text-sm">
               {data?.userLikedPost ? (
                <button className='flex items-center gap-2 hover:text-blue-600 transition' onClick={() => unlikeMutation.mutate()}>
                    <HeartIcon className='w-5 h-5  text-rose-600' />Unlike
                </button> 
            ) : (
                <button className=' flex items-center gap-2 hover:text-blue-600 transition' onClick={() => likeMutation.mutate()}>
                    <HeartIcon stroke='black' className='w-5 h-5 text-white' /> Like
                </button>
            )}
            <Link href={`/blog/${post.slug}/${post.id}/#comment`}
                 className="flex items-center gap-2 hover:text-blue-600 transition">
                    <ChatBubbleBottomCenterTextIcon className="w-5 h-5" /> Comment
                </Link>
                <button  onClick={onShare} className="flex items-center gap-2 hover:text-blue-600 transition">
                    <ArrowUpTrayIcon className="w-5 h-5" /> Share
                </button>
            </div>
        </div>
    );
};

export default BlogCard;
