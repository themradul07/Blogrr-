"use"
import React from 'react'
import ProfilePage from './components/profileComponent';
import { addFollower, getUserDetails } from '@/lib/actions/userActions';

type Props = {
    params: Promise<{
        id: string;
    }>;
}

const page = async ({ params }: Props) => {

    const { id } = await params;
    const user = await getUserDetails(+id);


    return (
        <div className='mx-auto max-w-3xl w-full '>


            <ProfilePage
                name={user.name}
                bio={user.bio}
                profileImageUrl={user.avatar?? "/avatar-default.jpg"}
                coverImageUrl={user?.coverImageUrl}
                posts={user.posts}
                // onFollow={handleFollow}
                id={user.id}
            />
        </div>

    )
}

export default page