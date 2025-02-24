import React, { useContext } from 'react'
import { ReviewContext } from './context/reviewContext'
import ReviewListItem from './ReviewListItem'

export default function ReviewsList() {
    const { product } = useContext(ReviewContext)

    return (
        <ul className='list-group-item my-5'>
            {
                product?.reviews?.map(review => (
                    <ReviewListItem key={review.id} review={review} />
                ))
            }
        </ul>
    )
}
