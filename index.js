require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const secaoRoutes = require('./routes/secaoRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const saldoRoutes = require('./routes/saldoRoutes');

app.use(cors({ origin: 'http://localhost:3000' }));


app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/secoes', secaoRoutes);
app.use('/api', paymentRoutes);
app.use('/api/saldo', saldoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));










