const router = require('express').Router();
const db = require('../db');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/users', authenticateToken, authorizeRoles('admin'), (_req, res) => {
  const users = db.listUsers();
  res.json({ count: users.length, users });
});
module.exports = router;
