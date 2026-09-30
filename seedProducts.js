const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("./models/Product");

dotenv.config();

const products = [
    {
        name: "Wireless Headphones",
        price: 2499,
        description: "Comfortable wireless headphones with clear sound.",
        stock: 25,
        category: "Electronics",
        image: "https://example.com/headphones.jpg"
    },
    {
        name: "Smart Watch",
        price: 3999,
        description: "Smart watch with fitness and notification features.",
        stock: 15,
        category: "Electronics",
        image: "https://example.com/smartwatch.jpg"
    },
    {
        name: "Running Shoes",
        price: 2999,
        description: "Lightweight running shoes for everyday workouts.",
        stock: 30,
        category: "Footwear",
        image: "https://example.com/shoes.jpg"
    },
    {
        name: "Laptop Backpack",
        price: 1499,
        description: "Durable backpack suitable for laptops and travel.",
        stock: 20,
        category: "Accessories",
        image: "https://example.com/backpack.jpg"
    },
    {
        name: "Bluetooth Speaker",
        price: 1999,
        description: "Portable Bluetooth speaker with powerful audio.",
        stock: 18,
        category: "Electronics",
        image: "https://example.com/speaker.jpg"
    }
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Product.deleteMany();

        await Product.insertMany(products);

        console.log("Products inserted successfully");

        await mongoose.connection.close();

        console.log("MongoDB connection closed");
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
};

seedProducts();