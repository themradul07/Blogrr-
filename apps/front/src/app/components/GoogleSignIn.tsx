import { BACKEND_URL } from '@/lib/constants'
import React from 'react'

type Props = {
    type: string;
}

const GoogleSignIn = ({type}:Props) => {
  return (<>
    <button
  type="button"
  className=" bg-white border border-gray-300 w-full rounded-md shadow-sm hover:shadow-md transition-all"
>
  <a className='flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5' href={`${BACKEND_URL}/auth/google/login`}>
  <img
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="Google"
    className="w-5 h-5"
    />
  <span className="text-gray-800 text-sm">Continue with Google</span>
  </a>
</button>

  
    </>
  )
}

export default GoogleSignIn 