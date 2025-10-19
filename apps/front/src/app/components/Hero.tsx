import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <>
    <div className="relative min-h-screen  w-full bg-slate-950">
      <div className="absolute  bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)] flex justify-center items-center text-white">
        <div className='flex flex-col gap-10 max-w-xl text-center'>

        <div>
          <h1 className='text-5xl font-bold'>
            Discover Inspiring Stories
          </h1>
        </div>
        <div>
          <p className='font-light'>
            Dive in the world of capititvating narratives and insightful perspectives. Explore a diverse range of topics, from personal growth to global trends, and uncover the stories that shape our world
          </p>
        </div>
        <div>
          <Link className='cursor-pointer' href={'/blog'}>

          <Button>
            
            Start Reading
          </Button>
          </Link>
        </div>
        </div>
      </div>
    </div>
    
    
    
    </>




  )
}

export default Hero