"use server"

import { authfetchGraphql, fetchGraphql } from "../fetchGraphQL"
import { CREATE_POST_MUTATION, DELETE_POST_MUTATION, GET_POST_BY_ID, GET_POSTS, GET_USER_POSTS, UPDATE_POST_MUTATION } from "../gqlQueries"
import { print } from "graphql"
import { Post } from "../types/modelTypes"
import { transformTakeSkip } from "../helpers"
import { PostFormState } from "../types/formState"
import { PostFormSchema } from "../zodSchema/postFormchema"
import { uploadThumbnail } from "../upload"


export const fetchPosts = async ({
    page,
    pageSize,
}: {
    page?: number,
    pageSize?: number
}

) => {
    const { skip, take } = transformTakeSkip({ page, pageSize });
    const data = await fetchGraphql(print(GET_POSTS), { skip, take });


    return { posts: data.posts as Post[], totalPosts: data.postCount };
}

export const fetchPostsById = async (id: number) => {

    const data = await fetchGraphql(print(GET_POST_BY_ID), { id });
    console.log("this is the raw data which is fetchedd" , data)
    return data.getPostbyId as Post;
}

export async function fetchUserPosts({
    page,
    pageSize,
}: {
    page: number,
    pageSize: number,
}) {
    const { take, skip } = transformTakeSkip({ page, pageSize });
    const data = await authfetchGraphql(print(GET_USER_POSTS), {
        take,
        skip
    })


    return {
        posts: data.getUserPosts as Post[],
        totalPosts: data.userPostCount as number,
    }
}

export async function saveNewPost(sate: PostFormState, formData: FormData): Promise<PostFormState> {
    const validatedFields = PostFormSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success)
        return {
            data: Object.fromEntries(formData.entries()),
            errors: validatedFields.error.flatten().fieldErrors
        };

    console.log("Here is the validated fields", validatedFields);
    let thumbnailUrl = "";

    if (validatedFields.data.thumbnail) {
        thumbnailUrl = await uploadThumbnail(validatedFields.data.thumbnail)
    }
    const {postId , ...restData} =  validatedFields.data;

    const data = await authfetchGraphql(print(CREATE_POST_MUTATION), {

        input: {
            ...restData,
            thumbnail: thumbnailUrl,
        }
    })

    if (data) return { message: "Success! New Post Saved ", ok: true };
    return { message: "Oops, Something went wrong", data }

}

export async function updatePost(
    sate: PostFormState, 
    formData: FormData
): Promise<PostFormState> {
    const validatedFields = PostFormSchema.safeParse(
                            Object.fromEntries(formData.entries())
                        );

    if (!validatedFields.success)
        return {
            data: Object.fromEntries(formData.entries()),
            errors: validatedFields.error.flatten().fieldErrors
        };

    const {thumbnail , ...input} = validatedFields.data;
    console.log("this value og thumbnail incase of undefinfed", thumbnail)

        let thumbnailUrl = "";
        
        if (thumbnail.size>0) {
            thumbnailUrl = await uploadThumbnail(validatedFields.data.thumbnail)
        }
        
        
        
    const data = await authfetchGraphql(print(UPDATE_POST_MUTATION), {

        input: {
            ...input,
            ...(thumbnailUrl && {thumbnail : thumbnailUrl})            
        }
    })

    if (data) return { message: "Success! New Post Saved ", ok: true };
    return { 
        message: "Oops, Something went wrong",
        data: Object.fromEntries(formData.entries()),
    }


}

export async function deletePost(postId:number){
    console.log("this is the recieved post id", postId);
    const data = await authfetchGraphql(print(DELETE_POST_MUTATION), {
        postId,
    });

    return data.deletePost;
}