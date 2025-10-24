"use server"

import { print } from "graphql"
import { authfetchGraphql, fetchGraphql } from "../fetchGraphQL"
import { CREATE_COMMENT_MUTATION, DELETE_COMMENT_MUTATION, GET_POST_COMMENTS, UPDATE_COMMENT_MUTATION } from "../gqlQueries"
import { CreateCommentFormState } from "../types/formState"
import { CommentFormSchema } from "../zodSchema/commentFormSchema"
import { string, success } from "zod"
import { error } from "console"

function handleError(context: string, error: unknown) {
  console.error(`❌ Error in ${context}:`, error)
  if (error instanceof Error) return { error: error.message }
  return { error: "An unexpected error occurred." }
}

export async function getPostComments({
  postId,
  skip,
  take,
}: {
  postId: number
  skip: number
  take: number
}) {
  try {
    const data = await fetchGraphql(print(GET_POST_COMMENTS), {
      postId,
      take,
      skip,
    })
    if (!data) throw new Error("No data received from backend")

    return {
      success: true,
      comments: data.getPostComments ?? [],
      count: data.postCommentCount ?? 0,
    }
  } catch (err) {
    return { success: false, count: 0, error: "An unexpected error occurred.", comments: [] }
  }
}

export async function saveComments(
  state: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  try {
    const validatedFields = CommentFormSchema.safeParse(
      Object.fromEntries(formData.entries())
    )

    if (!validatedFields.success)
      return {
        data: {
          content: String(formData.get("content") ?? ""),
          postId: Number(formData.get("postId") ?? 0),
        },
        errors: {
          content: validatedFields.error.flatten().fieldErrors.content ?? [],
        },
      }

    const data = await authfetchGraphql(print(CREATE_COMMENT_MUTATION), {
      input: {
        ...validatedFields.data,
      },
    })

    if (data)
      return {
        message: "Success! Your comment was saved!",
        ok: true,
        open: false,
      }

    return {
      message: "Oops! Something went wrong",
      ok: false,
      open: true,
      data: {
        content: String(formData.get("content") ?? ""),
        postId: Number(formData.get("postId") ?? 0),
      },
    }
  } catch (err) {
    return {
      message: `❌ ${handleError("saveComments", err).error}`,
      ok: false,
      open: true,
      data: {
        content: String(formData.get("content") ?? ""),
        postId: Number(formData.get("postId") ?? 0),
      },
    }
  }
}


export async function updateComment({
  commentId,
  content,
}: {
  commentId: number,
  content: string
}) {
  try {
    const data = await authfetchGraphql(print(UPDATE_COMMENT_MUTATION), {
 input : {
      id: commentId, content: content
    }})
    if (!data) throw new Error("No data received from backend");
    return {  success: true }
  } catch (err) {
    return { success: false , error : err }
  }

}

export async function deleteComment({
  commentId, 
}: {
  commentId: number,  
}) {
  try {
    const data = await authfetchGraphql(print(DELETE_COMMENT_MUTATION), {
      commentId: commentId  
    })
    if (!data) throw new Error("No data received from backend");
    return {  success: true }
  } catch (err) {
    return { success: false , error : err }
  }

}

