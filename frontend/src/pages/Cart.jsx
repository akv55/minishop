import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
    const { cartItems, addToCart, removeCart } = useCart();

    const handleQtyChange = (item, qty) => {
        addToCart({ _id: item.product }.Number(qty), true);
    };

    const total = cartItems.reduce((acc, item) => acc + item.qyt * item.price, 0).toFixed(2);

    return (
        <div className="container cart-page">
            <h1 className="cart-title">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="cart-empty">
                    <p>Your Cart is empty.</p>
                    <Link to="/" className="link-primary">Continue shoppnig</Link>
                </div>

            ) : (

                <div className="grid cart-layout">
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.product} className="card card-item">
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

                                <div className="cart-item-action">
                                    <select
                                        value={item.qyt}
                                        onChange={(e) => handleQtyChange(item, e.target.value)}
                                        className="cart-qyt-select"
                                    >
                                        {[...Array(item.countInstock).key()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => removeCart(item.product)}
                                        className="btn btn-danger cart-remove-btn"
                                        aria-label="Remove item"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className=" card cart-summary">
                        <h2 className="cart-summary-title">
                            Subtotal <span>({cartItems.reduce((acc, item) => acc + item.qyt, 0)}) items</span>
                        </h2>
                        <div className="cart-summary-total">
                            ₹{total}
                        </div>
                        <button
                            className="btn btn-primary cart-checkout-btn"
                            onClick={() => alert("Checkout functionality not implementedin this demon.")}
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