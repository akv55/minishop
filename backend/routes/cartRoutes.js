const express = require('express');
const router = express.Router();

// TODO: implement cart routes using controller/middleware
// Placeholder route so /api/cart does not break the app
router.get('/', (req, res) => {
	res.json({ message: 'Cart route placeholder' });
});

module.exports = router;