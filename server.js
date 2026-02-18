const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

// ✅ Serve only Indian.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Indian.html'));
});

// ✅ Serve other static assets (like .css, .js, images) manually
app.get('/:filename', (req, res) => {
  const file = req.params.filename;

  // BLOCK Home.html explicitly
  if (file.toLowerCase() === 'home.html') {
    return res.status(404).send('Home.html is not accessible.');
  }

  res.sendFile(path.join(__dirname, file));
});

mongoose.connect('mongodb://127.0.0.1:27017/farmmarket')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const paymentSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  paymentMethod: String,
  total: String,
  date: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', paymentSchema);

app.post('/api/payment', async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(200).json({ message: '💸 Payment stored successfully!' });
  } catch (err) {
    res.status(500).json({ error: '❌ Failed to store payment.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
