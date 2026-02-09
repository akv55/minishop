const express = require('express');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const validateCartItem = require('../middleware/validateCartItem');

module.exports.addToCart = async (req, res) => {
    const { productId, qty } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error });
    }
};