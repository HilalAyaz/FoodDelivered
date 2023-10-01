import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Order = () => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchMyOrder = async () => {
      const userEmail = localStorage.getItem('userEmail');
      try {
        const response = await axios.post(
          'http://localhost:5000/api/myOrderData',
          { email: userEmail },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          const data = response.data;
          console.log('Fetched order data:', data);
          setOrderData(data.orderData.order_data || []);
        }
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchMyOrder();
  }, []);

  // format date and time
  const formatDateAndTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toDateString();
    const formattedTime = date.toLocaleTimeString();
    return (
      <div>
        <p>Order Date: {formattedDate}</p>
        <p>Order Time: {formattedTime}</p>
      </div>
    );
  };

  return (
    <div className='container mt-3'>
      <div className='row'>
        {orderData.length > 0 ? (
          orderData.map((order, orderIndex) => (
            <div key={orderIndex} className='col-12 col-md-6 col-lg-4 mb-3'>
              <div className='order-container'>
                {formatDateAndTime(order.orderDate)}
                {order.items.map((item, itemIndex) => (
                  <div key={itemIndex} className='card m-2' style={{ width: '100%' }}>
                    <div className='row g-0'>
                      <div className='col-md-4'>
                        <img src={item.img} className='card-img' alt='...' />
                      </div>
                      <div className='col-md-8'>
                        <div className='card-body'>
                          <h5 className='card-title'>{item.name}</h5>
                          <p className='card-text'>
                            <span className='text-muted'>{item.size}</span>
                          </p>
                          <p className='card-text'>Quantity: {item.quantity}</p>
                          <p className='card-text'>
                            <small className='text-muted'>
                              Price: Rs.{item.price}/-
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                    Before proceeding to checkout, you must add some products to
                    your shopping cart. You will find a lot of interesting
                    products on our shop page.
                  </p>
                  <Link to='/' className='btn btn-primary'>
                    Explore Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
