"use client"

import SubmitButton from "@/app/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/actions/auth";
import { useActionState } from "react";

const SignInForm = ()=>{
    const [state, action] =  useActionState(signIn, undefined)
    return <form action={action} className="flex flex-col gap-2">
        {!!state?.message && (
        <p className="text-red-500 text-sm">{state?.message}</p>
        )}
        

        <div>
            <label htmlFor="email">Email</label>
            <Input id="email" name="email" placeholder="john@example.com" defaultValue={state?.data.email}/>
        </div>
        {!!state?.errors?.email && (<p className="text-red-500 text-sm">{state.errors.email}</p>)}

        <div>
            <label htmlFor="password">Password</label>
            <Input id="password" name="password" type="password" defaultValue={state?.data.password}/>
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

        <SubmitButton>Sign In</SubmitButton>


    </form>
}

export default SignInForm;