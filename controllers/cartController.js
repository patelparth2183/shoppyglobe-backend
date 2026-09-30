const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({
                message: "Product ID and quantity are required"
            });
        }

        if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        if (quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        if (product.stock < quantity) {
            return res.status(400).json({
                message: "Insufficient stock"
            });
        }

        let cartItem = await Cart.findOne({
            user: req.userId,
            product: productId
        });

        if (cartItem) {
            const newQuantity = cartItem.quantity + quantity;

            if (newQuantity > product.stock) {
                return res.status(400).json({
                    message: "Requested quantity exceeds available stock"
                });
            }

            cartItem.quantity = newQuantity;

            await cartItem.save();

            return res.status(200).json({
                message: "Cart quantity updated",
                cartItem
            });
        }

        cartItem = await Cart.create({
            user: req.userId,
            product: productId,
            quantity
        });

        res.status(201).json({
            message: "Product added to cart",
            cartItem
        });
    } catch (error) {
        next(error);
    }
};

const updateCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                message: "Invalid cart ID"
            });
        }

        if (!quantity || quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1"
            });
        }

        const cartItem = await Cart.findOne({
            _id: id,
            user: req.userId
        }).populate("product");

        if (!cartItem) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        if (quantity > cartItem.product.stock) {
            return res.status(400).json({
                message: "Quantity exceeds available stock"
            });
        }

        cartItem.quantity = quantity;

        await cartItem.save();

        res.status(200).json({
            message: "Cart updated successfully",
            cartItem
        });
    } catch (error) {
        next(error);
    }
};

const deleteCart = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                message: "Invalid cart ID"
            });
        }

        const cartItem = await Cart.findOneAndDelete({
            _id: id,
            user: req.userId
        });

        if (!cartItem) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        res.status(200).json({
            message: "Cart item deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addToCart,
    updateCart,
    deleteCart
};