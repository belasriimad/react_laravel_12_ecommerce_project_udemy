import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Rating } from 'react-simple-star-rating'
import { axiosRequest, getConfig } from '../../helpers/config'
import { toast } from 'react-toastify'
import { ReviewContext } from './context/reviewContext'

export default function ReviewListItem({review}) {
    const { user, token } = useSelector(state => state.user)
    const {
        product, setLoading, clearReview, editReview
    } = useContext(ReviewContext)

    const renderReviewActions = () => (
        review?.user_id === user?.id && 
            <div className="dropdown ms-auto">
                <i className="bi bi-three-dots-vertical"
                    data-bs-toggle="dropdown"></i>
                <ul className="dropdown-menu">
                    <li>
                        <span className="dropdown-item"
                            style={{cursor: 'pointer'}}
                            onClick={() => editReview(review)}
                            >
                            <i className="bi bi-pen mx-2"></i> Update
                        </span>
                    </li>
                    <li>
                        <span className="dropdown-item"
                            style={{cursor: 'pointer'}}
                            onClick={() => deleteReview(review)}
                            >
                            <i className="bi bi-trash mx-2"></i> delete
                        </span>
                    </li>
                </ul>
            </div>
    )

    const deleteReview = async (review) => {
        if(confirm('Are you sure ?')) {
            setLoading(true)
            try {
                const response = await axiosRequest.post('review/delete',review,
                    getConfig(token))
    
                    if(response.data.error) {
                        setLoading(false)
                        toast.error(response.data.error)
                        clearReview()
                    }else {
                        product.reviews = product.reviews.filter(item => item.id !== review.id)
                        toast.success(response.data.message)
                        setLoading(false)
                    }
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
    }

    return (
        <li className='list-group-item bg-light d-flex justify-content-start 
         align-items-center p-2 mb-2 rounded shadow-sm'>
            <div className="me-2">
                <img src={review?.user?.image_path} 
                    alt={review?.user?.name} 
                    className='rounded-circle'
                    width={60}
                    height={60}    
                />
            </div>
            <div className="d-flex flex-column">
                <h6>{review?.title}</h6>
                <p className='m-0'>{review?.body}</p>
                <Rating 
                    initialValue={review?.rating}
                    readonly
                    size={24}
                />
                <span className="text-muted">
                    {review?.created_at} by {" "}
                    <span className="fw-bold">
                         { review?.user?.name }
                    </span>
                </span>
            </div>
            {
                renderReviewActions()
            }
         </li>
    )
}
