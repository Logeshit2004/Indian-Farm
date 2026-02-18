const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const MONGO_URL = "mongodb://localhost:27017";
const DB_NAME = "indianFarmMarket";
const COLLECTION_NAME = "payments";

let db, payments;

// Connect to MongoDB
MongoClient.connect(MONGO_URL, { useUnifiedTopology: true })
  .then(client => {
    db = client.db(DB_NAME);
    payments = db.collection(COLLECTION_NAME);
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err);
  });

// Payment POST route
app.post("/api/payment", async (req, res) => {
  const { name, address, phone, total, paymentMethod } = req.body;

  if (!name || !address || !phone || !total || !paymentMethod) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await payments.insertOne({
      name,
      address,
      phone,
      total: parseFloat(total),
      paymentMethod,
      createdAt: new Date()
    });
    res.status(200).json({ message: "Payment saved successfully!" });
  } catch (err) {
    console.error("Error saving payment:", err);
    res.status(500).json({ error: "Failed to save payment" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
