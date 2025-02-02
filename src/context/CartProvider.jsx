import { useReducer } from 'react'
import {CartContext} from './CartContext'

export const CartProvider = ({children}) => {

    const initialState = []

    const cartReducer = (state = initialState, action = {}) => {
        switch (action.type) {
            case '[CART] Add Product':
                return [...state, action.payload]
            case '[CART] Remove Product':
                return state.filter(product => product.id !== action.payload)
            case '[CART] Increment Quantity':
                return state.map(product => product.id === action.payload ? {...product, quantity: product.quantity + 1} : product)
            case '[CART] Decrement Quantity':
                return state.map(product => product.id === action.payload && product.quantity > 1 ? {...product, quantity: product.quantity - 1} : product)
            default:
                return state
        }
    }

    const [shoppingList, dispatch] = useReducer(cartReducer, initialState)

    const addProduct = (product) => {
        product.quantity = 1
        dispatch({type: '[CART] Add Product', payload: product})
    }
    const removeProduct = (id) => {
        dispatch({type: '[CART] Remove Product', payload: id})
    }
    const incrementQuantity = (id) => {
        dispatch({type: '[CART] Increment Quantity', payload: id})
    }
    const decrementQuantity = (id) => {
        dispatch({type: '[CART] Decrement Quantity', payload: id})
    }

    

  return (
    <CartContext.Provider value={{shoppingList, addProduct, removeProduct, incrementQuantity, decrementQuantity}}>
        {children}
    </CartContext.Provider>
  )
}
