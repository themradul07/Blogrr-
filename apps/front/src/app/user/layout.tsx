import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren;

const layout = ({children}:Props) => {
  return (
    <div className='mt-20 m-auto flex justify-center items-center w-full'>
        {children}
    </div>
  )
}

export default layout