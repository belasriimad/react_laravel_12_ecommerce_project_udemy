import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import { axiosRequest, getConfig } from '../../helpers/config'
import { useSelector } from 'react-redux'
import { ReviewContext } from './context/reviewContext'
import { Rating } from 'react-simple-star-rating'

export default function AddUpdateReview() {
    const { token } = useSelector(state => state.user)
    const {
        product, review, setReview, setLoading, handleRating,
        clearReview, updating
    } = useContext(ReviewContext)

    const addReview = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axiosRequest.post('review/store',review,
                getConfig(token)
            )
            if(response.data.error){
                toast.error(response.data.error)
                setLoading(false)
            }else {
                toast.success(response.data.message)
                clearReview()
                setLoading(false)
            }
            
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const updateReview = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axiosRequest.put('review/update',review,
                getConfig(token)
            )
            if(response.data.error){
                toast.error(response.data.error)
                setLoading(false)
            }else {
                product.reviews = product.reviews.filter(item => item.id !== review.id)
                toast.success(response.data.message)
                clearReview()
                setLoading(false)
            }
            
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className='row my-5'>
            <div className="col-md-8 mx-auto">
                <div className="card shadow-sm">
                    <div className="card-header bg-white">
                        <h5 className="text-center mt-2">
                            { !updating ? 'Add' : 'Edit'} Review
                        </h5>
                    </div>
                    <div className="card-body">
                        <form className="mt-5" onSubmit={(e) => updating ? updateReview(e) : addReview(e)}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title*</label>
                                <input type="text"
                                    value={review.title}
                                    onChange={(e) => setReview({
                                        ...review, title: e.target.value
                                    })}
                                    required
                                    placeholder='Title'
                                    className="form-control" id="title"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="body" className="form-label">Review*</label>
                                <textarea name="body" rows="5"
                                    id="body"
                                    value={review.body}
                                    onChange={(e) => setReview({
                                        ...review, body: e.target.value
                                    })} 
                                    className='form-control'
                                    placeholder='Review'
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <Rating 
                                    initialValue={review.rating}
                                    onClick={handleRating}
                                    size={32}
                                />
                            </div>
                            {
                                !updating ?
                                    <button type="submit"
                                        disabled={!review.title || !review.body || review.rating === 0}
                                        className="btn btn-dark btn-sm">Submit</button>
                                    :
                                    <div>
                                        <button type="submit"
                                            disabled={!review.title || !review.body || review.rating === 0}
                                            className="btn btn-warning btn-sm">Update</button>
                                        <button type="button"
                                            onClick={() => clearReview()}
                                            className="btn btn-danger btn-sm mx-2">Cancel</button>
                                    </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
