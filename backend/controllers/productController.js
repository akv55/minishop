const products = require('../data/products');

// Get all products
module.exports.getAllProducts = (req, res) => {
    try {
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

