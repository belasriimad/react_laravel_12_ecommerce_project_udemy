import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css'
import "react-image-gallery/styles/css/image-gallery.css"
import './index.css'
import { ToastContainer } from 'react-toastify';
import { persistor, store } from './redux/store/index.js'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>  
      <div className='container card shadow-sm my-4'>
        <ToastContainer position='top-right'/>
        <App />
      </div>,
    </PersistGate>
  </Provider>
)
