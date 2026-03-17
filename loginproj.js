const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ObjectId } = require("mongodb"); // ✅ Keep only this declaration
const connectDB = require("./logindb");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let db;
connectDB().then((database) => {
    db = database;
});

// Login Endpoint
app.post("/login", async (req, res) => {
    try {
        if (!db) return res.status(500).json({ message: "Database not connected" });

        const { email, password } = req.body;
        const user = await db.collection("login").findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found. Redirecting to sign up" });
        if (user.password !== password) return res.status(401).json({ message: "Incorrect password" });

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Error during login", error: error.message });
    }
});

// Signup Endpoint
app.post("/signup", async (req, res) => {
    try {
        if (!db) return res.status(500).json({ message: "Database not connected" });

        const { email, password, username } = req.body;

        const existingUser = await db.collection("login").findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already has an account" });

        await db.collection("login").insertOne({ email, password, username });
        res.json({ message: "SignUp successful" });
    } catch (error) {
        console.error("Error during SignUp:", error);
        res.status(500).json({ message: "Error during SignUp", error: error.message });
    }
});

// Add an expense
app.post("/expenses", async (req, res) => {
    try {
        if (!db) return res.status(500).json({ message: "Database not connected" });

        const { title, amount, category, date, notes } = req.body;
        await db.collection("expenses").insertOne({ title, amount, category, date, notes });

        res.status(201).json({ message: "Expense added successfully" });
    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({ message: "Error adding expense", error: error.message });
    }
});

// Delete an expense
app.delete("/expenses/:id", async (req, res) => {
    try {
        if (!db) return res.status(500).json({ message: "Database not connected" });

        const { id } = req.params;
        const result = await db.collection("expenses").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) return res.status(404).json({ message: "Expense not found" });

        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error("Error deleting expense:", error);
        res.status(500).json({ message: "Error deleting expense", error: error.message });
    }
});

// Get all expenses
app.get("/expenses", async (req, res) => {
    try {
        if (!db) return res.status(500).json({ message: "Database not connected" });

        const expenses = await db.collection("expenses").find({}).toArray();
        res.status(200).json(expenses);
    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({ message: "Error fetching expenses", error: error.message });
    }
});

// Update an expense
app.put("/expenses/:id", async (req, res) => {
    try {
        if (!db) return res.status(500).json({ message: "Database not connected" });

        const { id } = req.params;
        const { title, amount, category, date, notes } = req.body;

        await db.collection("expenses").updateOne(
            { _id: new ObjectId(id) },
            { $set: { title, amount, category, date, notes } }
        );

        res.status(200).json({ message: "Expense updated successfully" });
    } catch (error) {
        console.error("Error updating expense:", error);
        res.status(500).json({ message: "Error updating expense", error: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
