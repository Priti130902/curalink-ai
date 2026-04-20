const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect('mongodb://localhost:27017/curalink')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(" DB Error:", err));

// Use Routes
app.use('/api', chatRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Modular Server on ${PORT}`));