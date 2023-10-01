import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


const CustomNavbar = () => {
  const { cart } = useCart();
  const [viewCart, setViewCart] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <Navbar bg='success' variant='dark' expand='lg'>
      <div className='container-fluid fw-bold '>
        <Navbar.Brand as={Link} to='/' className='fs-1'>
          Food Delivered
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto fs-4 '>
            <Nav.Link as={Link} to='/'>
              Home
            </Nav.Link>
            {localStorage.getItem('authToken') && (
              <Nav.Link as={Link} to='/myOrders'>
                My Orders
              </Nav.Link>
            )}
          </Nav>

          {!localStorage.getItem('authToken') ? (
            <div className='d-flex'>
              <Link className='btn bg-white text-success mx-1 fw-semibold' to='/login'>
                Login
              </Link>

              <Link className='btn bg-white text-success mx-1 fw-semibold' to='/createUser'>
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

              <div
                className='btn bg-white text-danger mx-1 fw-semibold'
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </Navbar.Collapse>
      </div>
      {viewCart && (
        <Modal onClose={() => setViewCart(false)}>
          <Cart />
        </Modal>
      )}
    </Navbar>
  );
};

export default CustomNavbar;
