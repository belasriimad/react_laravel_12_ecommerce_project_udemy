import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./components/Home"
import Header from "./components/layouts/Header"
import Product from './components/products/Product'
import Cart from './components/cart/Cart'
import Checkout from './components/checkout/Checkout'
import Register from './components/user/Register'
import Login from './components/user/Login'
import Profile from './components/user/Profile'
import PayByStripe from './components/checkout/PayByStripe'
import UserOrders from './components/user/UserOrders'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product/:slug" element={<Product/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/pay/order" element={<PayByStripe/>} />
        <Route path="/user/orders" element={<UserOrders/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
