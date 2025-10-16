import Link from 'next/link'
import React from 'react'
import SignInForm from './_components/signInForm'
import GoogleSignIn from '@/app/components/GoogleSignIn'


const SignInPage = () => {
  return (
    <div className='bg-white p-8 rounded-md shadow-md w-96 flex flex-col justify-center items-center'>
        <h2 className='text-center text-2xl font-bold mb-4'>Sign In Page</h2>        
        {/* Sign Up Form Here */}

        <SignInForm/>


        <div>
            
            <Link className="underline" href={"/auth/forgot"}><p>Forgot Password?</p></Link>
        </div>
         <GoogleSignIn type={"Sign Ip"}/>
    </div>
  )
}

export default SignInPage