import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './screens/Home'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Orders from './screens/myOrders'
import Navbar from './components/Navbar'

import './App.css'
import {CartProvider} from './components/ContextReducer'
import Footer from './components/Footer'

function App () {
  return (
    <CartProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/createUser' element={<Signup />} />
            <Route exact path='/myOrders' element={<Orders />} />
          </Routes>
          <Footer/>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
