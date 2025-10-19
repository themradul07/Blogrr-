import Link from 'next/link'
import React from 'react'
import SignUpForm from './components/signUpForm'
import GoogleSignIn from '@/app/components/GoogleSignIn'

const SignUpPage = () => {
  return (
    <div className='bg-white p-8 rounded-lg shadow-md w-[400px] flex flex-col justify-center items-center gap-4 '>
     
        <div className='flex justify-center items-center gap-2 '>

          <h1 className='text-2xl font-bold p-2 flex justify-center items-center gap-2'>
            <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
            Blogrr
          </h1>
        </div>

      
      <div className='flex gap-1 flex-col'>

        <h2 className='text-center text-xl font-semibold '>Create Your Account</h2>
        <p className='text-gray-600 text-xs text-center'>Welcome! Please Enter Your Details</p>
      </div>
      <div className='w-full'>

        <SignUpForm />
      </div>
      {/* Sign Up Form Here */}
      <div className='text-xs text-gray-500'>
        <div className='flex gap-2 justify-center items-center'>

        <p >Already have an account?</p>
        <Link className="underline text-blue-500 font-semibold" href={"/auth/signin"}>Sign in</Link>
        </div>
      </div>
      
      <GoogleSignIn type={"Sign Up"} />
    </div>
  )
}

export default SignUpPage