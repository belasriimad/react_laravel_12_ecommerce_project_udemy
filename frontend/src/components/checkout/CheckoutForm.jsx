import { PaymentElement } from "@stripe/react-stripe-js"
import { useState } from "react"
import { useStripe, useElements } from "@stripe/react-stripe-js"
import { axiosRequest, getConfig } from "../../helpers/config"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { clearCartItems, setValidCoupon } from "../../redux/slices/cartSlice"
import { setCurrentUser } from "../../redux/slices/userSlice"
import { toast } from "react-toastify"

export default function CheckoutForm() {
  const { cartItems } = useSelector(state => state.cart)
  const { token } = useSelector(state => state.user)
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [message, setMessage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const storeOrder = async () => {
    try {
      const response = await axiosRequest.post('store/order', {
        products: cartItems
      }, getConfig(token))
      
      dispatch(clearCartItems())
      dispatch(setValidCoupon({
        name: '',
        discount: 0
      }))
      dispatch(setCurrentUser(response.data.user))
      setIsProcessing(false)
      toast.success('Payment done successfully')
    } catch (error) {
      console.log(error)
      setIsProcessing(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsProcessing(true)

    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
      },
      redirect: "if_required",
    })

    if (
      (response.error && response.error.type === "card_error") ||
      (response.error && response.error.type === "validation_error")
    ) {
      setMessage(response.error.message)
    } else if (response.paymentIntent.id) {
      //display success message or redirect user
      storeOrder()
    }

    setIsProcessing(false)
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  )
}
