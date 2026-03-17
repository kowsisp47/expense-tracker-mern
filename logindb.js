const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017"; 
const client = new MongoClient(uri);
let db;

async function connectDB() {
    if (!db) {
        try {
            await client.connect();
            db = client.db("project");
            console.log("MongoDB Connected");
        } catch (e) {
            console.error("MongoDB Connection Error:", e);
        }
    }
    return db;
}

module.exports = connectDB;
