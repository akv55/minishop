import React from "react";
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
    const { cartItems } = useCart();
    const itemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <header className="navbar">
            <Link to="/" className="navbar-brand">
                MiniShop
            </Link>
            <nav>
                <ul className="navbar-links">
                    <li>
                        <Link to="/cart" className="navbar-cart-link"></Link>
                        <FaShoppingCart className="navbar-cart-icon"/>
                        <span>Cart</span>
                        {itemCount>0 &&(
                            <span className="cart-badge">
                                {itemCount}
                            </span>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    )
};

export default Navbar;