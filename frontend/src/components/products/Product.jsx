import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosRequest } from '../../helpers/config'
import Alert from '../layouts/Alert'
import Spinner from '../layouts/Spinner'
import { Parser } from 'html-to-react'
import Slider from './images/Slider'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/slices/cartSlice'
import Reviews from '../reviews/Reviews'
import { Rating } from 'react-simple-star-rating'

export default function Product() {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null)
    const [qty, setQty] = useState(1)
    const [error, setError] = useState('')
    const { slug } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchProductBySlug = async () => {
            setLoading(true)
            try {
                const response = await axiosRequest.get(`product/${slug}/show`)
                setProduct(response.data.data)
                setLoading(false)
            } catch (error) {
                if(error?.response?.status === 404) {
                    setError('The product you are looking for does not exist.')
                }
                console.log(error)
                setLoading(false)
            }
        }
        fetchProductBySlug()
    },[slug])

    const calculateReviewAverage = () => {
        let average = product?.reviews?.reduce((acc,review) => {
            return acc += review.rating / product.reviews.length
        }, 0);

        return average > 0 ? average.toFixed(1) : 0
    }

    const makeUniqueId = (length) => {
        let result = ''
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        let counter = 0
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength))
          counter += 1
        }
        return result
    }

    return (
        <div className='card my-5'>
            {
                error ? 
                    <Alert content={error} type="danger" />
                :
                loading ?
                    <Spinner />
                :
                <>
                    <div className="row g-0">
                        <div className="col-md-4 p-2">
                            <Slider product={product} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <h5 className="text-dark">{product?.name}</h5>
                                    <h6 className="badge bg-danger p-2">${product?.price}</h6>
                                </div>
                                {
                                    calculateReviewAverage() > 0 && <div className="d-flex align-items-center">
                                        <span className="mx-1 text-muted">
                                            <i>
                                                { product?.reviews?.length } {" "}
                                                { product?.reviews?.length > 1 ? 'Reviews' : 'Review' }
                                            </i>
                                        </span>
                                        <Rating 
                                            initialValue={calculateReviewAverage()}
                                            readonly 
                                            size={32}
                                        />
                                    </div>
                                }
                            </div>
                            <div className="my-3">
                                { Parser().parse(product?.desc) }
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex justify-content-start align-items-center mb-3">
                                    {
                                        product.sizes?.map(size => (
                                            <span key={size.id} 
                                                onClick={() => setSelectedSize(size)}
                                                style={{cursor: 'pointer'}}
                                                className={`bg-light text-dark me-2 p-1 fw-bold ${selectedSize?.id === size.id ? 'border border-dark-subtle border-2' : ''}`}
                                            >
                                                <small>{size.name}</small>
                                            </span>
                                        ))
                                    }
                                </div>
                                <div className='me-2'>
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
                                            onClick={() => setSelectedColor(color)}
                                            className={`me-1 ${selectedColor?.id === color.id ? 'border border-dark-subtle border-2' : ''}`}
                                            style={{
                                                backgroundColor: color.name.toLowerCase(),
                                                height: '20px',
                                                width: '20px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="row mt-5">
                                <div className="col-md-6 mx-auto">
                                    <div className="mb-4">
                                        <input type="number" className="form-control" 
                                            placeholder="Qty" 
                                            value={qty}    
                                            onChange={(e) => setQty(e.target.value)}
                                            min={1}
                                            max={product?.qty > 1 ? product?.qty : 1}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-dark"
                                        disabled={!selectedColor || !selectedSize || product?.qty == 0 || product?.status == 0}
                                        onClick={() => {
                                            dispatch(addToCart({
                                                product_id: product.id,
                                                ref: makeUniqueId(10),
                                                name: product.name,
                                                slug: product.slug,
                                                qty: parseInt(qty),
                                                price: parseInt(product.price),
                                                color: selectedColor.name,
                                                size: selectedSize.name,
                                                maxQty: parseInt(product.qty),
                                                image: product.thumbnail,
                                                coupon_id: null
                                            }))
                                            setSelectedColor(null)
                                            setSelectedSize(null)
                                            setQty(1)
                                        }}
                                    >
                                        <i className="bi bi-cart-plus-fill"></i> {" "}
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col-md-8 mx-auto">
                            <div className="card">
                                <div className="card-header bg-white text-center">
                                    <h5 className="mt-2">
                                        Reviews ({product?.reviews?.length})
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <Reviews 
                                        product={product}
                                        setLoading={setLoading}
                                    />
                                </div>
                            </div>
                        </div>                   
                    </div>
                </>
            }
        </div>
    )
}
