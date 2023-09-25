import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Order = () => {
  const [orderData, setOrderData] = useState([])

  useEffect(() => {
    const fetchMyOrder = async () => {
      const userEmail = localStorage.getItem('userEmail')
      try {
        const response = await axios.post(
          'http://localhost:5000/api/myOrderData',
          { email: userEmail },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        if (response.status === 200) {
          const data = response.data
          setOrderData(data.orderData) // Update the state with the orderData array
        }
      } catch (error) {
        console.error('Error fetching order data:', error) // here comes the error message if trying to fetch fails
      }
    }

    fetchMyOrder()
  }, [])

  return (
    <div className='container'>
      <div className='row'>
        {Array.isArray(orderData) && orderData.length > 0 ? (
          orderData.map((item, itemIndex) => (
            <div key={itemIndex} className='col-12 col-md-6 col-lg-3'>
              <div
                className='card mt-3'
                style={{ width: '16rem', maxHeight: '360px' }}
              >
                <img
                  src={item.img}
                  className='card-img-top'
                  alt='...'
                  style={{ height: '120px', objectFit: 'fill' }}
                />
                <div className='card-body'>
                  <h5 className='card-title'>{item.name}</h5>
                  <div
                    className='container w-100 p-0'
                    style={{ height: '38px' }}
                  >
                    <span className='m-1'>{item.quantity}</span>
                    <span className='m-1'>{item.size}</span>
                    <span className='m-1'>{item.Order_date}</span>
                    <div className='d-inline ms-2 h-100 w-20 fs-5'>
                      Rs.{item.price}/-
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='py-6 py-lg-12'>
            <div className='container mt-5'>
              <div className='row'>
                <div className='offset-lg-3 col-lg-6 col-md-12 col-12 text-center'>
                  <img
                    src='https://codescandy.com/coach/rtl/assets/images/bag.svg'
                    alt=''
                    className='img-fluid mb-4'
                  />
                  <h2>Your shopping cart is empty</h2>
                  <p className='mb-4'>
                    Return to the store to add items for your delivery slot.
                    Before proceed to checkout you must add some products to
                    your shopping cart. You will find a lot of interesting
                    products on our shop page.
                  </p>
                  <Link href='/' className='btn btn-primary'>
                    Explore Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Order
