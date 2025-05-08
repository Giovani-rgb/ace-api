require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();
const memberRoutes = require('./routes/memberRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(cors());

app.use(express.json());
app.use('/api/members', memberRoutes);
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
