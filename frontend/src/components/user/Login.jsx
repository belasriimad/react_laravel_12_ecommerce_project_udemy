import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { axiosRequest } from '../../helpers/config'
import Spinner from '../layouts/Spinner'
import useValidations from '../custom/useValidations'
import { setCurrentUser, setToken, setLoggedInOut } from '../../redux/slices/userSlice'

export default function Login() {
    const { isLoggedIn } = useSelector(state => state.user)
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [validationErrors, setValidationErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(isLoggedIn) navigate('/')
    },[isLoggedIn])

    const loginUser = async (e) => {
        e.preventDefault()
        setValidationErrors([])
        setLoading(true)
        try {
            const response = await axiosRequest.post('user/login', user)
            setLoading(false)
            if(response.data.error){
                toast.error(response.data.error)
            }else {
                dispatch(setCurrentUser(response.data.user))
                dispatch(setToken(response.data.access_token))
                dispatch(setLoggedInOut(true))
                toast.success(response.data.message)
                navigate('/')
            }
        } catch (error) {
            if(error?.response?.status === 422) {
                setValidationErrors(error.response.data.errors)
            }
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className='row my-5'>
            <div className="col-md-6 mx-auto">
                <div className="card shadow-sm">
                    <div className="card-header bg-white">
                        <h5 className="text-center mt-2">
                            Login
                        </h5>
                    </div>
                    <div className="card-body">
                        <form className="mt-5" onSubmit={(e) => loginUser(e)}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address*</label>
                                <input type="email" 
                                    value={user.email}
                                    onChange={(e) => setUser({
                                        ...user, email: e.target.value
                                    })}
                                    className="form-control" id="email"/>
                                    { useValidations(validationErrors, 'email')}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password*</label>
                                <input type="password" 
                                    value={user.password}
                                    onChange={(e) => setUser({
                                        ...user, password: e.target.value
                                    })}
                                    className="form-control" id="password" />
                                    { useValidations(validationErrors, 'password')}
                            </div>
                            {
                                loading ?
                                    <Spinner />
                                :
                                <button type="submit" className="btn btn-dark btn-sm">Submit</button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
