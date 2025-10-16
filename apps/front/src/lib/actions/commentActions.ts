"use server"

import { print } from "graphql"
import { authfetchGraphql, fetchGraphql } from "../fetchGraphQL"
import { CREATE_COMMENT_MUTATION, GET_POST_COMMENTS } from "../gqlQueries"
import { CommentEntity } from "../types/modelTypes"
import { CreateCommentFormState } from "../types/formState"
import { CommentFormSchema } from "../zodSchema/commentFormSchema"
import { tr } from "zod/v4/locales"

export async function getPostComments({
    postId,
    skip,
    take
}:{
    postId: number,
    skip: number,
    take: number,
}){

    const data = await fetchGraphql(print(GET_POST_COMMENTS), {
        postId,
        take,
        skip,
    })
    if (!data) throw new Error("No data received from backend");

    return {
      comments: data.getPostComments ?? [],
      count: data.postCommentCount ?? 0,
    };
}

export async function saveComments(
    state: CreateCommentFormState,
    formData: FormData
): Promise<CreateCommentFormState>{
    const validatedFields = CommentFormSchema.safeParse(
        Object.fromEntries(formData.entries())
    );


    if(!validatedFields.success) return{
        data: {
            content: String(formData.get("content") ?? ""),
            postId: Number(formData.get("postId") ?? 0),
        },
        errors: {
            content: validatedFields.error.flatten().fieldErrors.content ?? [],
        },
    }

    const data = await authfetchGraphql(print(CREATE_COMMENT_MUTATION),{
        input:{
            ...validatedFields.data
        }
    })


    if(data) return{
        message : "Success! Your comments saved!",
        ok: true,
        open: false,
    }

    return {
        message:"Oops! Something went wrong", 
        ok: false,
        open: true,
        data: {
            content: String(formData.get("content") ?? ""),
            postId: Number(formData.get("postId") ?? 0),
        },
    }
}