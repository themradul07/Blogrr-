"use server"

import { print } from "graphql"
import { authfetchGraphql } from "../fetchGraphQL"
import {  LIKE_POST_MUTATION, POST_LIKES, UNLIKE_POST_MUTATION } from "../gqlQueries"

export async function getPostLikedData(postId: number){
    const data  = await authfetchGraphql(print(POST_LIKES), {
        postId: +postId,
    });   

    return {
        likeCount: data.postLikesCount as number,
        userLikedPost : data.userLikePost as boolean,
    }
}

export async function likePost(postId: number){
    const data = await authfetchGraphql(print(LIKE_POST_MUTATION) , {
        postId : +postId
    })

}

export async function unlikePost(postId: number){
    const data = authfetchGraphql(print(UNLIKE_POST_MUTATION) , {
        postId : +postId
    })
}