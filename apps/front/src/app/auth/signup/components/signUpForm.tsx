"use client"

import SubmitButton from "@/app/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";

const SignUpForm = ()=>{
    const [state, action] =  useActionState(signUp, undefined);
    useEffect(() => {
      if(state?.message==="NEXT_REDIRECT"){
        redirect('/');
      }
    
     
    }, [state, action]);
    return <form action={action} className="flex flex-col gap-2">
        {!!state?.message && (
        <p className="text-red-500 text-sm">{state?.message}</p>
        )}
        <div>
            <label className="text-sm" htmlFor="name">Name</label>
            <Input className="mt-2 bg-gray-50" id="name" name="name" placeholder="John Doe" defaultValue={state?.data.email} />
        </div>
        {!!state?.errors?.name && (<p className="text-red-500 text-sm">{state.errors.name}</p>)}

        <div>
            <label className="text-sm" htmlFor="email">Email</label>
            <Input className="mt-2 bg-gray-50" id="email" name="email" placeholder="john@example.com" defaultValue={state?.data.name}/>
        </div>
        {!!state?.errors?.email && (<p className="text-red-500 text-sm">{state.errors.email}</p>)}

        <div>
            <label className="text-sm" htmlFor="password">Password</label>
            <Input className="mt-2 bg-gray-50" id="password" name="password" type="password" defaultValue={state?.data.password}/>
        </div>
        {!!state?.errors?.password && (
            <div className="text-red-500 text-sm">
                <p>Password must:</p>
                <ul>

                {state.errors.password.map((err)=>(
                    <li key={err}>{err}</li>
                ))}
                </ul>
            </div>)}

        <SubmitButton className="mt-4">Sign Up</SubmitButton>

        


    </form>
}

export default SignUpForm;