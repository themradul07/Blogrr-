import Link from 'next/link'
import React from 'react'

const SignInPanel = () => {
  return (
    <>
    <Link href={'/auth/signup'} >Sign Up</Link>
    <Link href={'/auth/signin'}>Sign In</Link>
    </>
  )
}

export default SignInPanel