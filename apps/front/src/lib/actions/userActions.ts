"use server"

import { print } from "graphql";
import { authfetchGraphql } from "../fetchGraphQL";
import { ADD_FOLLOWER_MUTATION, GET_USER_QUERY, IS_FOLLOWING_QUERY, REMOVE_FOLLOWER_MUTATION, SUGGESTED_USER_QUERY, UPDATE_USER_MUTATION } from "../gqlQueries";
import { UpdateUserFormState } from "../types/formState";
import { UpdateProfileFormSchema } from "../zodSchema/UpdateUserFormSchema";
import { uploadThumbnail } from "../upload";



export const suggestedUsers = async (query?: string) => {
  try {
    const data = await authfetchGraphql(print(SUGGESTED_USER_QUERY), {
      query
    });
    console.log("data recieved from the backend ", data);

    if (!data?.suggestedUsers) {
      throw new Error("No liked posts found");
    }

    return data.suggestedUsers;
  } catch (error: any) {
    console.error("❌ Error fetching Suggested User:", error.message || error);
    return [];
  }
}

export const getUserDetails = async (id: number) => {
  try {
    const data = await authfetchGraphql(print(GET_USER_QUERY), {
      "UserId": id
    });
    console.log("data recieved from the backend ", data);

    if (!data?.getUserDetails) {
      throw new Error("Error Occured");
    }

    return data.getUserDetails;
   
  } catch (error: any) {
    console.error("❌ Error fetching Suggested User:", error.message || error);
    return [];
  }
}

export const addFollower = async (followerId: number) => {
  try {
    const data = await authfetchGraphql(print(ADD_FOLLOWER_MUTATION), {
      followerId
    });
    console.log("data recieved from the backend ", data);
    return data.addFollower;
  } catch (error: any) {
    console.error("❌ Error adding follower:", error.message || error);
    return false;
  }
}

export const removeFollower = async (followerId: number) => {
  try {
    const data = await authfetchGraphql(print(REMOVE_FOLLOWER_MUTATION), {
      followerId
    });

    return data.removeFollower;
  } catch (error: any) {
    console.error("❌ Error adding follower:", error.message || error);
    return false;
  }
}

export const isFollowing = async (followerId: number) => {
  try {
    console.log("recieved the follower id ", followerId); 
    const data = await authfetchGraphql(print(IS_FOLLOWING_QUERY), {
      followerId
    });

    if(!data?.isFollowing) throw new Error("Error Occured");
    console.log("data recieved from the backend ", data); 
   
    return data.isFollowing;
  } catch (error: any) {
    console.error("❌ Error adding follower:", error.message || error);
    return false;
  }
}

export async function updateProfile(
  state: UpdateUserFormState,
  formData: FormData
): Promise<UpdateUserFormState> {
  try {
    const validated = UpdateProfileFormSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validated.success)
      return {
        data: Object.fromEntries(formData.entries()),
        errors: validated.error.flatten().fieldErrors,
      };
    console.log("validated data ", validated.data);

    const { avatar, ...input } = validated.data;
    let avatarUrl = "";

    if (avatar && (avatar as File).size > 0) {
      avatarUrl = await uploadThumbnail(avatar);
    }

    const data = await authfetchGraphql(print(UPDATE_USER_MUTATION), {
      input: { ...input, ...(avatarUrl && { avatar: avatarUrl }) },
    });

    if (data) return { message: "✅ Post updated successfully", ok: true };
    return { message: "⚠️ Failed to update post", ok: false };
  } catch (err) {
    return { message: `Failed to update the content`, ok: false };
  }
}