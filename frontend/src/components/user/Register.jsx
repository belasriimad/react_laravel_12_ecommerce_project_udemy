import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { axiosRequest } from '../../helpers/config'
import Spinner from '../layouts/Spinner'
import useValidations from '../custom/useValidations'
import { useSelector } from 'react-redux'

export default function Register() {
    const { isLoggedIn } = useSelector(state => state.user)
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [validationErrors, setValidationErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if(isLoggedIn) navigate('/')
    },[isLoggedIn])

    const registerNewUser = async (e) => {
        e.preventDefault()
        setValidationErrors([])
        setLoading(true)
        try {
            const response = await axiosRequest.post('user/register', user)
            setLoading(false)
            toast.success(response.data.message)
            navigate('/login')
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
                            Register
                        </h5>
                    </div>
                    <div className="card-body">
                        <form className="mt-5" onSubmit={(e) => registerNewUser(e)}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name*</label>
                                <input type="text"
                                    value={user.name}
                                    onChange={(e) => setUser({
                                        ...user, name: e.target.value
                                    })}
                                    className="form-control" id="name"/>
                                { useValidations(validationErrors, 'name')}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address*</label>
                                <input type="email" 
                                    value={user.email}
                                    onChange={(e) => setUser({
                                        ...user, email: e.target.value
                                    })}
                                    className="form-control" id="email"/>
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
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
