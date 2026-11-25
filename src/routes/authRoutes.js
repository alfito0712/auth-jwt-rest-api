const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Nama, email, dan password wajib diisi' });
    if (password.length < 8) return res.status(400).json({ message: 'Password minimal 8 karakter' });
    const normalizedEmail = email.trim().toLowerCase();
    if (db.findUserByEmail(normalizedEmail)) return res.status(409).json({ message: 'Email sudah terdaftar' });
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = db.createUser({ name: name.trim(), email: normalizedEmail, password: hashedPassword });
    res.status(201).json({ message: 'Registrasi berhasil', user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error); res.status(500).json({ message: 'Gagal melakukan registrasi' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email dan password wajib diisi' });
    const user = db.findUserByEmail(email.trim().toLowerCase());
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: 'Email atau password salah' });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
    res.json({ message: 'Login berhasil', token, tokenType: 'Bearer', expiresIn: process.env.JWT_EXPIRES_IN || '1h',
      user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error); res.status(500).json({ message: 'Gagal melakukan login' });
  }
});
module.exports = router;
