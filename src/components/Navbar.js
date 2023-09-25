import React, { useState } from 'react'
import Badge from 'react-bootstrap/Badge'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal'
import Cart from '../screens/Cart'
import { useCart } from './ContextReducer'

const Navbar = () => {
  const { cart } = useCart()
  const [viewCart, setViewCart] = useState(false)
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-success'>
        <div className='container-fluid fw-bold'>
          <Link className='navbar-brand fs-1' to='/'>
            Food Delivered
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav fs-5 me-auto mb-2'>
              <li className='nav-item'>
                <Link className='nav-link active' aria-current='page' to='/'>
                  Home
                </Link>
              </li>
              {localStorage.getItem('authToken') ? (
                <li className='nav-item'>
                  <Link
                    className='nav-link active'
                    aria-current='page'
                    to='/myOrders'
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ''
              )}
            </ul>

            {!localStorage.getItem('authToken') ? (
              <div className='d-flex'>
                <Link
                  className='btn bg-white text-success mx-1 fw-semibold'
                  to='/login'
                >
                  Login
                </Link>

                <Link
                  className='btn bg-white text-success mx-1 fw-semibold'
                  to='/createUser'
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div>
                <div
                  className='btn bg-white text-success mx-1 fw-semibold'
                  onClick={() => setViewCart(true)}
                >
                  My Cart{'  '}
                  <Badge pill bg='danger'>
                    {cart ? cart.length : 0}
                  </Badge>
                </div>

                {viewCart ? (
                  <Modal onClose={() => setViewCart(false)}>
                    <Cart />
                  </Modal>
                ) : null}
                
                <div
                  className='btn bg-white text-danger mx-1 fw-semibold'
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
