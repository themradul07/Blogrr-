import Link from 'next/link'
import React from 'react'

import GoogleSignIn from '@/app/components/GoogleSignIn'
import SignInForm from './_components/signInForm'

const SignInPage = () => {
  return (
    <div className='bg-white p-8 rounded-lg shadow-md w-[400px] flex flex-col justify-center items-center gap-4 '>
     
        <div className='flex justify-center items-center gap-2 '>

          <h1 className='text-2xl font-bold p-2 flex justify-center items-center gap-2'>
            <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
            Blogrr
          </h1>
        </div>

      
      <div className='flex gap-1 flex-col'>

        <h2 className='text-center text-xl font-semibold '>Sign In Your Account</h2>
        <p className='text-gray-600 text-xs text-center'>Welcome Back! Please Enter Your Details</p>
      </div>
      <div className='w-full'>

        <SignInForm />
      </div>
      {/* Sign Up Form Here */}
      <div className='text-xs text-gray-500'>
        <div className='flex gap-2 justify-center items-center'>

        <p>Create New Account?</p>
        <Link className="underline text-blue-500 font-semibold" href={"/auth/signup"}>Sign Up</Link>
        </div>
      </div>
      
      <GoogleSignIn type={"Sign Up"} />
    </div>
  )
}

export default SignInPage