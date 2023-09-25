import React, { createContext, useContext } from 'react'

const CartStateContext = createContext()
const CartDispatchContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            id: action.id,
            name: action.name,
            quantity: action.quantity,
            size: action.size,
            price: action.price,
            img: action.img
          }
        ]
      }
    case 'REMOVE_FROM_CART':
      const updatedCart = [...state.cart]
      updatedCart.splice(action.index, 1)
      return {
        ...state,
        cart: updatedCart
      }
    case 'UPDATE_CART':
      return {
        ...state,
        cart: state.cart.map(food => {
          if (food.id === action.id && food.size === action.size) {
            return {
              ...food,
              quantity: parseInt(action.quantity) + food.quantity,
              price: action.price + food.price
            }
          }
          return food
        })
      }
      case 'DROP':
        let empArray=[]
        return empArray

    default:
      console.log('error in reducer')
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, { cart: [] })

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCart = () => useContext(CartStateContext)
export const useDispatchCart = () => useContext(CartDispatchContext)
