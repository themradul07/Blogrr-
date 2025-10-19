import React, { PropsWithChildren } from 'react'

const AuthLayout = ({children}: PropsWithChildren) => {
  return (
    <div className='min-h-screen flex w-full pt-24 items-center justify-center bg-slate-100'>
        {" "}
        {children}
    </div>
  )
}

export default AuthLayout