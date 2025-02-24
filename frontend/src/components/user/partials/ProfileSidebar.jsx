import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useValidations from '../../custom/useValidations'
import { axiosRequest, getConfig } from '../../../helpers/config'
import { setCurrentUser } from '../../../redux/slices/userSlice'
import { toast } from 'react-toastify'

export default function ProfileSidebar() {
    const { user, token } = useSelector(state => state.user)
    const [image, setImage] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const fileInput = useRef()

    const updateProfileImage = async () => {
        setValidationErrors([])
        setLoading(true)

        const formData = new FormData()
        formData.append('profile_image',image)
        formData.append('_method', 'PUT')

        try {
            const response = await axiosRequest.post('user/profile/update', 
                formData,getConfig(token,'multipart/form-data'))
            dispatch(setCurrentUser(response.data.user))
            setImage('')
            setLoading(false)
            fileInput.current.value = ''
            toast.success(response.data.message)
        } catch (error) {
            if(error?.response?.status === 422) {
                setValidationErrors(error.response.data.errors)
            }
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className='col-md-4'>
            <div className="card-p-2">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img src={user?.profile_image} alt={user?.name} 
                        width={150}
                        height={150}
                        className='rounded-circle'
                    />
                    <div className="input-group my-3">
                        <input type="file" accept='image/*' 
                            ref={fileInput}
                            onChange={(e) => setImage(e.target.files[0])}
                            className='form-control'
                        />
                        { useValidations(validationErrors, 'profile_image')}
                        {
                            loading ?
                                <span className="text-danger fw-bold mx-1 mt-1">
                                    uploading...
                                </span>
                            :
                            <button className="btn btn-sm btn-primary"
                                disabled={!image}
                                onClick={() => updateProfileImage()}
                            >
                                Upload
                            </button>
                        }
                    </div>
                </div>
            </div>
            <ul className="list-group w-100 text-center mt-2">
                <li className="list-group-item">
                    <i className="bi bi-person"></i> {user?.name}
                </li>
                <li className="list-group-item">
                    <i className="bi bi-envelope-at-fill"></i> {user?.email}
                </li>
                <li className="list-group-item">
                    <Link to="/user/orders" className='text-decoration-none text-dark'>
                        <i className="bi bi-bag-check-fill"></i> Orders
                    </Link>
                </li>
            </ul>
        </div>
    )
}
