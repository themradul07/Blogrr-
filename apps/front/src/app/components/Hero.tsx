import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <>
      <div className="relative min-h-screen w-full bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)] flex justify-center items-center text-white px-6 sm:px-8 md:px-12">
          <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 max-w-2xl text-center">
            
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug">
                Discover Inspiring Stories
              </h1>
            </div>

            <div>
              <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed">
                Dive into the world of captivating narratives and insightful perspectives. Explore a diverse range of topics—from personal growth to global trends—and uncover the stories that shape our world.
              </p>
            </div>

            <div>
              <Link href="/blog">
                <Button className="px-6 py-3 text-sm sm:text-base">
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
