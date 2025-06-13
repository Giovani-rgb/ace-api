require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();
const figlet = require('figlet');
const chalk = require('chalk');
const pkg = require('./package.json');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const secaoRoutes = require('./routes/secaoRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const saldoRoutes = require('./routes/saldoRoutes');
const bannerRoutes = require('./routes/bannerRoutes');



app.use(cors({ origin: 'http://localhost:3000' }));


app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/secoes', secaoRoutes);
app.use('/api', paymentRoutes);
app.use('/api/saldo', saldoRoutes);
app.use('/api/banners', bannerRoutes);

const PORT = process.env.PORT || 3001;

figlet.text('CDN-V.E.R.U.M.', {
  font: 'Block', // ou 'Standard', 'Big', 'Block', 'Slant' etc.
  horizontalLayout: 'default',
  verticalLayout: 'default',
}, function(err, data) {
  if (err) {
    console.log('Erro ao gerar banner');
    return;
  }
  console.log(chalk.cyan(data));
  console.log(chalk.green(`Version: v${pkg.version}`));
  console.log(chalk.yellow('Powered by Express & Node.js'));
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




















