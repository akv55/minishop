import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            // Check if item exists
            const existItem = state.cartItems.find((x) => x.product === action.payload.product);
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product ? action.payload : x
                    ),
                };
            } else {
                return { ...state, cartItems: [...state.cartItems, action.payload] };
            }
        case 'REMOVE_ITEM':
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload),
            };
        case 'CLEAR_CART':
            return { ...state, cartItems: [] };
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : []
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }, [state.cartItems]);

    const addToCart = async (product, qty, replaceQty = false) => {
        try {
            const existItem = state.cartItems.find((x) => x.product === product._id);
            const quantity = replaceQty ? qty : (existItem ? existItem.qty + qty : qty);

            // Optimistic UI or API validation
            const { data } = await axios.post('/api/cart', { productId: product._id, qty: quantity });

            dispatch({
                type: 'ADD_ITEM',
                payload: {
                    product: data.item.product, // ID
                    name: data.item.name,
                    image: data.item.image,
                    price: data.item.price,
                    countInStock: data.item.countInStock,
                    qty: data.item.qty,
                },
            });
        } catch (error) {
            console.error("Failed to add to cart", error);
            alert(error.response?.data?.message || error.message);
        }
    };

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    return (
        <CartContext.Provider value={{ ...state, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
