import { useState, useEffect } from "react";
import axios from 'axios';
import ProductCard from "../components/ProductCard";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products');
                const items = Array.isArray(data) ? data : data.products || [];
                setProducts(items);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <div className="page-loading">Loading products...</div>;

    return (
        <div className="container product-list-page">
            <div className="page-header">
                <h1 className="page-title">Latest Products</h1>
                <p className="page-subtitle">Curated picks just for you</p>
            </div>
            <div className="grid grid-2 grid-3 grid-4">
                {products.map((product)=>(
                    <ProductCard key={product.id || product._id} product={product}/>
                ))}

            </div>
        </div>
    );

};

export default ProductList;