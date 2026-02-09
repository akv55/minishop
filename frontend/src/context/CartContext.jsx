import { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';

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

    const addToCart = (product, qty, replaceQty = false) => {
        const productId = product._id ?? product.id;
        const existItem = state.cartItems.find((x) => x.product === productId);
        const quantity = replaceQty ? qty : (existItem ? existItem.qty + qty : qty);

        dispatch({
            type: 'ADD_ITEM',
            payload: {
                product: productId,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock ?? product.countInstock ?? 5,
                qty: quantity,
            },
        });

        if (existItem) {
            toast.info(`${product.name} quantity updated in cart`);
        } else {
            toast.success(`${product.name} added to cart`);
        }
    };

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
        toast.info('Item removed from cart');
    };

    return (
        <CartContext.Provider value={{ ...state, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
