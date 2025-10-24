"use client"
import React, { useState } from 'react'
import {useQuery} from "@tanstack/react-query"
import { deleteComment, getPostComments, updateComment } from '@/lib/actions/commentActions'
import { DEFAULT_PAGE_SIZE } from '@/lib/constants'
import CommentsCard from './CommentsCard'
import CommentPagination from './CommentPagination'
import CommentCardSkeleton from './CommentCardSkeleton'
import { SessionUser } from '@/lib/session'
import AddComment from '@/app/components/addComment'

type Props = {
  postId : number,
  user?: SessionUser,
}
type Output  ={
  comments : Comment[],
  success: boolean,
  count: number,
}
const Comments = ({postId, user} : Props) => {

  const [page, setPage] = useState(1);
  

  const {data , isLoading ,refetch} = useQuery<Output>({
    queryKey: ["GET_POST_COMMENTS", postId, page],
    queryFn: async ()=> await getPostComments({
      postId,
      skip : (page-1)* DEFAULT_PAGE_SIZE,
      take : DEFAULT_PAGE_SIZE,
    })
  })

  const handleSave =async (commentId:number , content:string)=>{
    const data = await updateComment({
      commentId: commentId, 
      content: content,
    })
    refetch();
  }

 const handleDelete =async (commentId:number )=>{
    await deleteComment({commentId})
    refetch();

  }


  if(data===undefined || !data.success) return <p>Loading...</p>

  const  totalPages = Math.ceil((data.count ?? 0) / DEFAULT_PAGE_SIZE);


  return (
    <div className='p-2 rounded-md '>
      <h6 className='text-2xl'>
        Comments
      </h6>
    <div className='flex flex-col gap-4'>
      {!!user && <AddComment className='ml-4 mt-4' user={user} postId={postId} refetch={refetch}/> }
      {isLoading && Array.from({ length:12 }).map((_, index)=>(<CommentCardSkeleton key={index}/>   ))}
      {!isLoading &&
        data.count ===0?
        <p>No Comment Yet</p>:
        data?.comments.map((comment:any)=><CommentsCard ondelete={handleDelete} onSave={handleSave} currentUserId={parseInt(user?.id||'0')} key={comment.id} comment={comment}/>)      
      }           
        
    

    </div>
    <CommentPagination className='p-2' currentPage={page} setCurrentPage={(p)=>setPage(p)} totalPages={totalPages} pageNeighbors={1}/>

    </div>
  )
}

export default Comments;