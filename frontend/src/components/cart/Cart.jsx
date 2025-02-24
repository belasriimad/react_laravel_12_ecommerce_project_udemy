import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../layouts/Alert'
import { decrementQ, incrementQ, removeFromCart } from '../../redux/slices/cartSlice'
import { Link } from 'react-router-dom'

export default function Cart() {
    const { cartItems } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const total = cartItems.reduce((acc, item) => acc += item.price * item.qty, 0)

    return (
        <div className='row my-4'>
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        {
                            cartItems.length > 0 ?
                                <>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Color</th>
                                                <th>Size</th>
                                                <th>Subtotal</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cartItems.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{index+=1}</td>
                                                        <td>
                                                            <img src={item.image} 
                                                                width={60} height={60}
                                                                className='img-fluid rounded' />
                                                        </td>
                                                        <td>{item.name}</td>
                                                        <td>
                                                            <i className="bi bi-caret-up"
                                                                onClick={() => dispatch(incrementQ(item))}
                                                                style={{cursor: "pointer"}}></i>
                                                            <span className="mx-2">
                                                                {item.qty}
                                                            </span>
                                                            <i className="bi bi-caret-down"
                                                                onClick={() => dispatch(decrementQ(item))}
                                                                style={{cursor: "pointer"}}></i>
                                                        </td>
                                                        <td>${item.price}</td>
                                                        <td>
                                                            <div 
                                                                className='border border-light-subtle border-2'
                                                                style={{
                                                                    backgroundColor: item.color.toLowerCase(),
                                                                    height: '20px',
                                                                    width: '20px'
                                                                }}
                                                                >
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="bg-light text-dark me-2 p-1 fw-bold">
                                                                <small>{item.size}</small>
                                                            </span>
                                                        </td>
                                                        <td>${item.qty * item.price}</td>
                                                        <td>
                                                            <i className="bi bi-cart-x"
                                                                onClick={() => dispatch(removeFromCart(item))}
                                                                style={{cursor: "pointer"}}></i>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <div className="d-flex justify-content-center">
                                        <div className="border border-dark border-3 fw-bold p-2 rounded">
                                            Total: ${ total }
                                        </div>
                                    </div>
                                </>
                            :
                            <Alert content="Your cart is empty"
                                type="primary" />
                        }
                    </div>
                    <div className="my-3 d-flex justify-content-end">
                        <Link to="/" className='btn btn-dark rounded-0 mx-2'>
                            Continue Shopping
                        </Link>
                        {
                            cartItems.length > 0  && 
                            <Link to="/checkout" className='btn btn-danger rounded-0 mx-2'>
                                Checkout
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
