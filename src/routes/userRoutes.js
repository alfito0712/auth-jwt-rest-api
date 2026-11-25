const router = require('express').Router();
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

router.get('/profile', authenticateToken, (req, res) => {
  const user = db.findUserById(req.user.id);
  if (!user) return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
  const { password, ...safeUser } = user;
  res.json({ user: safeUser });
});
module.exports = router;
