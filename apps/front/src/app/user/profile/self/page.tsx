
"use server"
import React from 'react'

import { getUserDetails } from '@/lib/actions/userActions';
import { getSession } from '@/lib/session';
import ProfilePage from './components/ProfilePageSelf';
import Sidebar from '../../_components/Sidebar';



const page = async () => {
    const session = await getSession();
    if (!session?.user?.id) {
        return <div className='mx-auto mt-32 text-center text-red-600 text-xl'>You need to be logged in to view this page.</div>
    }    
    const user = await getUserDetails(parseInt(session?.user.id));


    return (
        <div className='mx-auto flex max-h-screen w-full'>
             <div className=' max-h-screen hidden md:block'>
        <Sidebar />

      </div>
      <div className=' overflow-scroll p-4 w-full'>

            <ProfilePage
                name={user.name}
                bio={user.bio}
                profileImageUrl={user.avatar}
                coverImageUrl={user?.coverImageUrl}
                posts={user.posts}
                // onFollow={handleFollow}
                id={user.id}
            />
            </div>
        </div>

    )
}

export default page