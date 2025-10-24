import { success } from "zod";
import { BACKEND_URL } from "./constants"
import { getSession } from "./session";

export const fetchGraphql = async ( query: string, variables={})=>{

   try {
    const response= await fetch(`${BACKEND_URL}/graphql`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            query,
            variables
        })
    })

    const result = await response.json();
    if(result.errors){
        console.error("Graphql errors:", result.errors);
        throw new Error("Failed to fetch the data from Graphql");
   
    }
    return result.data;
    
   } catch (error) {
    console.log(error);
    
   }
    
}

export const authfetchGraphql = async ( query: string, variables={})=>{

   try {
    const session = await getSession();
   
    if(!session){
      return new Error("Please Login!!")
    }
    const response= await fetch(`${BACKEND_URL}/graphql`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${session?.accessToken}`
        },
        body:JSON.stringify({
            query,
            variables
        })
    })

    const result = await response.json();
    if(result.errors){
        console.error("Graphql errors:", result.errors);
        throw new Error("Failed to fetch the data from Graphql");
   
    }
    
    return result.data;

    
   } catch (error) {
    console.log(error);
    
   }
    
}