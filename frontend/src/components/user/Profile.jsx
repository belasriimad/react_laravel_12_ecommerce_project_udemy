import React, { useEffect } from 'react'
import ProfileSidebar from './partials/ProfileSidebar'
import UpdateUserInfos from './UpdateUserInfos'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
    const { isLoggedIn } = useSelector(state => state.user)
    const navigate = useNavigate()
    
    useEffect(() => {
        if(!isLoggedIn) navigate('/login')
    },[isLoggedIn])

    return (
        <div className='row my-5'>
            <ProfileSidebar />
            <UpdateUserInfos profile={true}/>
        </div>
    )
}
