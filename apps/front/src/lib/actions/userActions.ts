"use server"

import { print } from "graphql";
import { authfetchGraphql } from "../fetchGraphQL";
import { SUGGESTED_USER_QUERY } from "../gqlQueries";



export const suggestedUsers = async (query?:string)=>{
    
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