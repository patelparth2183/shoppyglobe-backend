const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
    addToCart,
    updateCart,
    deleteCart
} = require("../controllers/cartController");

const router = express.Router();

router.post("/cart", authMiddleware, addToCart);
router.put("/cart/:id", authMiddleware, updateCart);
router.delete("/cart/:id", authMiddleware, deleteCart);

module.exports = router;