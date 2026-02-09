import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';
import { FaHeartBroken } from "react-icons/fa";
const Cart = () => {
    const { cartItems, addToCart, removeFromCart } = useCart();

    const handleQtyChange = (item, qty) => {
        addToCart(
            {
                _id: item.product,
                name: item.name,
                image: item.image,
                price: item.price,
                countInStock: item.countInStock,
            },
            Number(qty),
            true
        );
    };

    const total = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

    return (
        <div className="container cart-page">
            {cartItems.length === 0 ? (
                <div className="cart-empty">
                    <h1 className="page-title">Shopping Cart</h1>
                    <FaHeartBroken className="cart-empty-icon" />
                    <p>Your cart is empty.</p>
                    <Link to="/" className="link-primary">Continue shopping</Link>
                </div>

            ) : (

                <div className="grid cart-layout">
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.product} className="card cart-item">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-info">
                                    <Link to={`/product/${item.product}`} className="cart-item-title">
                                        {item.name}
                                    </Link>
                                    <div className="cart-item-price">₹{item.price}</div>
                                </div>

                                <div className="cart-item-actions">
                                    <select
                                        value={item.qty}
                                        onChange={(e) => handleQtyChange(item, e.target.value)}
                                        className="cart-qty-select"
                                    >
                                        {Array.from({ length: item.countInStock || 0 }, (_, x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => removeFromCart(item.product)}
                                        className="btn btn-danger cart-remove-button"
                                        aria-label="Remove item"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="card cart-summary">
                        <h2 className="cart-summary-title">
                            Subtotal <span>({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</span>
                        </h2>
                        <div className="cart-summary-total">
                            ₹{total}
                        </div>
                        <button
                            className="btn btn-primary cart-checkout-button"
                            onClick={() => alert("Checkout functionality not implemented in this demo.")}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Cart;