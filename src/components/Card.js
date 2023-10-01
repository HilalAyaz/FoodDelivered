import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'

const Card = ({ foodItem }) => {
  const data = useCart()
  const dispatch = useDispatchCart()
  const options = foodItem.options && foodItem.options[0]
  const priceRef = useRef()
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState(Object.keys(options)[0])

  useEffect(() => {
    if (priceRef.current && options) {
      setSize(Object.keys(options)[0])
    }
  }, [options])

  useEffect(() => {
    if (options && size) {
      const selectedPrice = options[size]
      setTotalPrice(quantity * parseInt(selectedPrice))
    } else {
      setTotalPrice(0)
    }
  }, [size, quantity, options])

  const [totalPrice, setTotalPrice] = useState(0)

  // Handle size change
  const handleSizeChange = e => {
    const newSize = e.target.value
    setSize(newSize)
  }

  const handleAddToCart = async () => {
    if (data.cart) {
      const existingCartItemIndex = data.cart.findIndex(
        item => item.id === foodItem._id && item.size === size
      )

      if (existingCartItemIndex !== -1) {
        const updatedCart = [...data.cart]
        updatedCart[existingCartItemIndex].quantity += quantity
        updatedCart[existingCartItemIndex].price += totalPrice

        await dispatch({
          type: 'UPDATE_CART',
          cart: updatedCart
        })
      } else {
        await dispatch({
          type: 'ADD_TO_CART',
          id: foodItem._id,
          name: foodItem.name,
          img: foodItem.img,
          quantity: quantity,
          price: totalPrice,
          size: size
        })
      }

      console.log(data)
    }
  }

  return (
    <div className='card mt-3' style={{ minWidth: '18rem', maxWidth: '100%' }}>
      <img
        src={foodItem.img}
        alt={foodItem.name}
        className='card-img-top'
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className='card-body d-flex flex-column  '>
        <h5 className='card-title'>{foodItem.name}</h5>
        <p className='card-text'>{foodItem.description}</p>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-md-6'>
              <select
                className='form-select'
                style={{ height: '100%' }}
                onChange={e => setQuantity(parseInt(e.target.value))}
              >
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-md-6'>
              <select
                className='form-select m-2'
                ref={priceRef}
                onChange={handleSizeChange}
              >
                {Object.keys(options).map(optionKey => (
                  <option key={optionKey} value={optionKey}>
                    {optionKey}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className='d-flex align-items-center mt-auto fs-6'>
          Rs.{totalPrice}/-
        </div>
      </div>
      <button
        className='btn btn-outline-success justify-content-center ms-2'
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default Card
