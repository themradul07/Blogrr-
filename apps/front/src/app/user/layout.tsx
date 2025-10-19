import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren;

const layout = ({children}:Props) => {
  return (
    <div className='mt-16 m-auto flex items-center w-full bg-slate-100 h-full '>
        {children}
    </div>
  )
}

export default layout