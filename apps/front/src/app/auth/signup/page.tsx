import Link from 'next/link'
import React from 'react'
import SignUpForm from './components/signUpForm'
import GoogleSignIn from '@/app/components/GoogleSignIn'

const SignUpPage = () => {
  return (
    <div className='bg-white p-8 rounded-md shadow-md w-96 flex flex-col justify-center items-center'>
        <h2 className='text-center text-2xl font-bold mb-4'>Sign Up Page</h2>
        <SignUpForm/>
        {/* Sign Up Form Here */}
        <div>
            <p>Already have an account?</p>
            <Link className="underline" href={"/auth/signin"}>Sign in?</Link>
        </div>
        <GoogleSignIn type={"Sign Up"}/>
    </div>
  )
}

export default SignUpPage