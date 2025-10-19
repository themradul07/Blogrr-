"use server"

import { print } from "graphql";
import { authfetchGraphql } from "../fetchGraphQL";
import { GET_ALL_TAGS } from "../gqlQueries";


export const getAllTags = async ()=>{
    
      try {
        const data = await authfetchGraphql(print(GET_ALL_TAGS));
    
        if (!data?.getTopTags) {
          throw new Error("No liked posts found");
        }
    
        return data.getTopTags;
      } catch (error: any) {
        console.error("❌ Error fetching liked posts:", error.message || error);
        return [];
      }
  
}