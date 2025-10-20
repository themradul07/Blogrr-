"use server";

import { authfetchGraphql, fetchGraphql } from "../fetchGraphQL";
import {
  CREATE_POST_MUTATION,
  DELETE_POST_MUTATION,
  GET_ALL_POSTS,
  GET_POST_BY_ID,
  GET_POSTS,
  GET_RELEATED_POSTS,
  GET_USER_POSTS,
  UPDATE_POST_MUTATION,
} from "../gqlQueries";
import { print } from "graphql";
import { Post } from "../types/modelTypes";
import { transformTakeSkip } from "../helpers";
import { PostFormState } from "../types/formState";
import { PostFormSchema } from "../zodSchema/postFormchema";
import { uploadThumbnail } from "../upload";

  // 🧩 Centralized error logger
function handleError(context: string, error: unknown) {
  console.error(`❌ Error in ${context}:`, error);
  if (error instanceof Error) return { error: error.message };
  return { error: "An unexpected error occurred." };
}

// 📘 Fetch all posts (paginated)
export const fetchPosts = async ({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) => {
  try {
    const { skip, take } = transformTakeSkip({ page, pageSize });
    const data = await fetchGraphql(print(GET_POSTS), { skip, take });
    return { posts: data.posts as Post[], totalPosts: data.postCount };
  } catch (err) {
    return handleError("fetchPosts", err);
  }
};

// 📘 Fetch single post by ID
export const fetchPostsById = async (id: number) => {
  try {
    const data = await fetchGraphql(print(GET_POST_BY_ID), { id });
    return data.getPostbyId as Post;
  } catch (err) {
    return handleError("fetchPostsById", err);
  }
};

// 📘 Fetch posts by user
export async function fetchUserPosts({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
  try {
    const { take, skip } = transformTakeSkip({ page, pageSize });
    const data = await authfetchGraphql(print(GET_USER_POSTS), { take, skip });
    return {
      posts: data.getUserPosts as Post[],
      totalPosts: data.userPostCount as number,
    };
  } catch (err) {
    return handleError("fetchUserPosts", err);
  }
}

// ✏️ Create new post
export async function saveNewPost(
  state: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  try {
    const validated = PostFormSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validated.success)
      return {
        data: Object.fromEntries(formData.entries()),
        errors: validated.error.flatten().fieldErrors,
      };

    let thumbnailUrl = "";
    if (validated.data.thumbnail) {
      
      thumbnailUrl = await uploadThumbnail(validated.data.thumbnail);
    }

    const { postId, ...rest } = validated.data;
    const data = await authfetchGraphql(print(CREATE_POST_MUTATION), {
      input: { ...rest, thumbnail: thumbnailUrl },
    });

    if (data) return { message: "✅ Post created successfully", ok: true };
    return { message: "⚠️ Failed to create post", ok: false };
  } catch (err) {
    return { message: `❌ ${handleError("saveNewPost", err).error}`, ok: false };
  }
}

// ✏️ Update existing post
export async function updatePost(
  state: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  try {
    const validated = PostFormSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validated.success)
      return {
        data: Object.fromEntries(formData.entries()),
        errors: validated.error.flatten().fieldErrors,
      };

    const { thumbnail, ...input } = validated.data;
    let thumbnailUrl = "";

    if (thumbnail && (thumbnail as File).size > 0) {
      thumbnailUrl = await uploadThumbnail(thumbnail);
    }

    const data = await authfetchGraphql(print(UPDATE_POST_MUTATION), {
      input: { ...input, ...(thumbnailUrl && { thumbnail: thumbnailUrl }) },
    });

    if (data) return { message: "✅ Post updated successfully", ok: true };
    return { message: "⚠️ Failed to update post", ok: false };
  } catch (err) {
    return { message: `❌ ${handleError("updatePost", err).error}`, ok: false };
  }
}

// 🗑️ Delete post
export async function deletePost(postId: number) {
  try {
    const data = await authfetchGraphql(print(DELETE_POST_MUTATION), { postId });
    return data.deletePost;
  } catch (err) {
    return handleError("deletePost", err);
  }
}

// 🔗 Get related posts
export async function getRelatedPosts(postId: number) {
  try {
    const data = await authfetchGraphql(print(GET_RELEATED_POSTS), { postId });
    return data.getReleatedPost as Post[];
  } catch (err) {
    return handleError("getRelatedPosts", err);
  }
}

// 🌍 Get all posts (with filters, pagination, etc.)
export async function getAllPosts({
  search = "",
  tags = [],
  page = 1,
}: {
  search?: string;
  tags?: string[];
  page?: number;
}) {
  try {
    const data = await fetchGraphql(print(GET_ALL_POSTS), {
      search,
      tags,
      pagination: {
        skip: (page - 1) * 6,
        take: 12,
      },
    });

    if (!data) throw new Error("No data received from backend");

    return data.getAllPosts as Post[];
  } catch (err) {
    return handleError("getAllPosts", err);
  }
}
