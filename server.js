require('dotenv').config();
const express = require('express');
const db = require('./src/db');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

const app = express();
app.use(express.json());

app.get('/', (_req, res) => res.json({ message: 'Auth JWT API aktif' }));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.use((req, res) => res.status(404).json({ message: 'Endpoint tidak ditemukan' }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Terjadi kesalahan pada server' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server berjalan: http://localhost:${port}`));
