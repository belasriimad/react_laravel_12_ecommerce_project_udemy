import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Stripe from './Stripe'

export default function PayByStripe() {
    const { isLoggedIn } = useSelector(state => state.user)
    const { cartItems } = useSelector(state => state.cart)
    const navigate = useNavigate()
    
    useEffect(() => {
        if(!isLoggedIn) navigate('/login')
        if(!cartItems.length) navigate('/')
    },[isLoggedIn,cartItems])

    return (
        <div className="my-5">
            <div className="col-md-6 mx-auto">
                <Stripe />
            </div>
        </div>
    )
}
