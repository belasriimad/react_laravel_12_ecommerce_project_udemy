import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { axiosRequest, getConfig } from '../../helpers/config'
import Spinner from '../layouts/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from '../../redux/slices/userSlice'

export default function UpdateUserInfos({profile}) {
    const { user, token } = useSelector(state => state.user)
    const [userInfos, setUserInfos] = useState({
        phone_number: user?.phone_number,
        address: user?.address,
        city: user?.city,
        country: user?.country,
        zip_code: user?.zip_code
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const updateUserInfos = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axiosRequest.put('user/profile/update', userInfos, getConfig(token))
            dispatch(setCurrentUser(response.data.user))
            setLoading(false)
            toast.success(response.data.message)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className="col-md-8">
            <div className="card shadow-sm">
                <div className="card-header bg-white">
                    <h5 className="text-center mt-2">
                        { profile ? 'User Details' : 'Billing Details'}
                    </h5>
                </div>
                <div className="card-body">
                    <form className="mt-5" onSubmit={(e) => updateUserInfos(e)}>
                        <div className="mb-3">
                            <label htmlFor="phone_number" className="form-label">Phone Number*</label>
                            <input type="text"
                                value={userInfos.phone_number || ''}
                                onChange={(e) => setUserInfos({
                                    ...userInfos, phone_number: e.target.value
                                })}
                                required
                                className="form-control" id="phone_number"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address*</label>
                            <input type="text"
                                value={userInfos.address || ''}
                                onChange={(e) => setUserInfos({
                                    ...userInfos, address: e.target.value
                                })}
                                required
                                className="form-control" id="address"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="zip_code" className="form-label">Zip Code*</label>
                            <input type="text"
                                value={userInfos.zip_code || ''}
                                onChange={(e) => setUserInfos({
                                    ...userInfos, zip_code: e.target.value
                                })}
                                required
                                className="form-control" id="zip_code"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City*</label>
                            <input type="text"
                                value={userInfos.city || ''}
                                onChange={(e) => setUserInfos({
                                    ...userInfos, city: e.target.value
                                })}
                                required
                                className="form-control" id="city"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Country*</label>
                            <input type="text"
                                value={userInfos.country || ''}
                                onChange={(e) => setUserInfos({
                                    ...userInfos, country: e.target.value
                                })}
                                required
                                className="form-control" id="country"/>
                        </div>
                        {
                            loading ?
                                <Spinner />
                            :
                            !user?.profile_completed || profile ?
                                <button type="submit" className="btn btn-dark btn-sm">Submit</button>
                            : ''
                        }
                    </form>
                </div>
            </div>
        </div>
)
}
