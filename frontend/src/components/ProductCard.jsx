import React from "react";
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';


const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product, 1);
    }

    return (
        <div className="card product-card">
            <Link to={`/product/${product._id}`} className="product-image-link">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                />
            </Link>
            <div className="product-body">
                <Link to={`/product/${product._id}`} className="product-title-link">
                    <h3 className="product-title">{product.name}</h3>
                    <span className="product-price">₹{product.price}</span>
                </Link>

                <div className="product-info">
                    <button
                        onClick={handleAddToCart}
                        className="btn btn-primary product-add-button"
                        disabled={product.countInStock === 0}
                    >
                        {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;