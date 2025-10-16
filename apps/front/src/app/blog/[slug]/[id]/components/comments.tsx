"use client"
import React, { useState } from 'react'
import {useQuery} from "@tanstack/react-query"
import { getPostComments } from '@/lib/actions/commentActions'
import { DEFAULT_PAGE_SIZE } from '@/lib/constants'
import CommentsCard from './CommentsCard'
import CommentPagination from './CommentPagination'
import CommentCardSkeleton from './CommentCardSkeleton'
import { SessionUser } from '@/lib/session'
import AddComment from '@/app/components/addComment'

type Props = {
  postId : number,
  user: SessionUser
}
const Comments = ({postId, user} : Props) => {

  const [page, setPage] = useState(1);

  const {data , isLoading ,refetch} = useQuery({
    queryKey: ["GET_POST_COMMENTS", postId, page],
    queryFn: async ()=> await getPostComments({
      postId,
      skip : (page-1)* DEFAULT_PAGE_SIZE,
      take : DEFAULT_PAGE_SIZE,
    })
  })

  const totalPages = Math.ceil((data?.count??0)/DEFAULT_PAGE_SIZE);
  return (
    <div className='p-2 rounded-md shadow-md'>
      <h6 className='text-lg text-slate-700'>
        Comments
      </h6>
    <div className='flex flex-col gap-4'>
      {!!user && <AddComment user={user} postId={postId} refetch={refetch}/> }
      {isLoading?
        Array.from({ length:12 }).map((_, index)=>(<CommentCardSkeleton key={index}/>   )):
      data?.comments.map((comment)=><CommentsCard key={comment.id} comment={comment}/>)
    }

    </div>
    <CommentPagination className='p-2' currentPage={page} setCurrentPage={(p)=>setPage(p)} totalPages={totalPages} pageNeighbors={1}/>

    </div>
  )
}

export default Comments;