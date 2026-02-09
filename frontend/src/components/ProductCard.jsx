import React from "react";
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';


const ProductCard = ({ product }) => {
    const { addTocart } = useCart();

    const handleAddToCart = () => {
        addTocart(product, 1);
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
                <Link to={`/product/${product._id}`} className="product-title">
                    <h3 className="product-title">{product.name}</h3>
                </Link>
                <div className="product-info">
                    <span className="product-price">${product.price}</span>
                    <button>
                        {product.countInstock ===0 ?'Out of Stock' :'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;