import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'

export default function ProductListItem({ product }) {

  const calculateReviewAverage = () => {
    let average = product?.reviews?.reduce((acc,review) => {
      return acc += review.rating / product.reviews.length
    }, 0);

    return average > 0 ? average.toFixed(1) : 0
  }

  return (
    <div className='col-md-4 mb-3'>
      <Link to={`/product/${product.slug}`} className='text-decoration-none text-dark'>
        <div className="card shadow-sm h-100">
          <img src={product.thumbnail} alt={product.name} 
            className='card-img-top' />
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="text-dark">{product.name}</h5>
                <h6 className="badge bg-danger p-2">${product.price}</h6>
              </div>
              <div className="my-2">
              {
                calculateReviewAverage() > 0 &&
                  <Rating
                    initialValue={calculateReviewAverage()}
                    readonly 
                    size={24}
                  />
              }
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-start align-items-center mb-3">
                    {
                      product.sizes?.map(size => (
                        <span key={size.id} className="bg-light text-dark me-2 p-1 fw-bold">
                          <small>{size.name}</small>
                        </span>
                      ))
                    }
                </div>
                <div>
                  {
                    product.status == 1 ? 
                      <span className="badge bg-success p-2">
                        In Stock 
                      </span>
                    :
                      <span className="badge bg-danger p-2">
                        Out of Stock 
                      </span>
                  }
                </div>
              </div>
              <div className="d-flex justify-content-start align-items-center mb-3">
                {
                  product.colors?.map(color => (
                    <div key={color.id} 
                      className='me-1 border border-light-subtle border-2'
                      style={{
                        backgroundColor: color.name.toLowerCase(),
                        height: '20px',
                        width: '20px'
                      }}
                    >
                    </div>
                  ))
                }
              </div>
            </div>
        </div>
      </Link>
    </div>
  )
}
