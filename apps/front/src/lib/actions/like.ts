"use server";

import { print } from "graphql";
import { authfetchGraphql } from "../fetchGraphQL";
import {
  LIKE_POST_MUTATION,
  POST_LIKES,
  POST_LIKES_AND_COMMENTS,
  UNLIKE_POST_MUTATION,
  USER_LIKED_POSTS,
} from "../gqlQueries";
import { error } from "console";


export async function getPostLikedData(postId: number) {
  try {
    const data = await authfetchGraphql(print(POST_LIKES_AND_COMMENTS), { postId: +postId });
    console.log("Post Likes Data:", data);

    return {
      likeCount: data?.postLikesCount ?? 0,
      userLikedPost: data?.userLikePost ?? false,
      postCommentCount: data?.postCommentCount ?? 0,
    };
  } catch (error: any) {
    console.log("❌ Error fetching post likes:", error.message || error);
    return {
      likeCount: 0,
      userLikedPost: false,
    };
  }
}

export async function likePost(postId: number) {
  try {
    const data = await authfetchGraphql(print(LIKE_POST_MUTATION), {
      postId: +postId,
    });
    
    if (!data?.likePost) {
      // Throw instead of returning, so React Query knows this is an error
      throw new Error("Failed to like post");
    }

    // Return normally for success
    return { success: true, message: "Post liked successfully" };
  } catch (error: any) {
    console.log("❌ Error liking post:", error.message || error);

    // Throw the error instead of returning it
    // This allows TanStack Query to catch and forward it to `onError`
    throw new Error(error.message || "Failed to like post");
  }
}

export async function unlikePost(postId: number) {
  try {
    const data = await authfetchGraphql(print(UNLIKE_POST_MUTATION), {
      postId: +postId,
    });

    if (!data?.unlikePost) {
      throw new Error("Failed to unlike post");
    }

    return { success: true, message: "Post unliked successfully" };
  } catch (error: any) {
    console.error("❌ Error unliking post:", error.message || error);
    return { success: false, message: "Failed to unlike post" };
  }
}

export async function getUserLikedPosts() {
  try {
    const data = await authfetchGraphql(print(USER_LIKED_POSTS));

    if (!data?.LikedPosts) {
      throw new Error("No liked posts found");
    }

    return data.LikedPosts;
  } catch (error: any) {
    console.error("❌ Error fetching liked posts:", error.message || error);
    return [];
  }
}
