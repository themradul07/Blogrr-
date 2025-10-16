import { BACKEND_URL } from '@/lib/constants'
import React from 'react'

type Props = {
    type: string;
}

const GoogleSignIn = ({type}:Props) => {
  return (
    <a className='w-32 bg-black text-white' href={`${BACKEND_URL}/auth/google/login`}>
      {type} with Google
    </a>
  )
}

export default GoogleSignIn 