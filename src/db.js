const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'database.json');

function readUsers() {
  if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify({ users: [] }, null, 2));
  return JSON.parse(fs.readFileSync(file, 'utf8')).users;
}
function writeUsers(users) {
  fs.writeFileSync(file, JSON.stringify({ users }, null, 2));
}
function findUserByEmail(email) { return readUsers().find(u => u.email === email); }
function findUserById(id) { return readUsers().find(u => u.id === Number(id)); }
function createUser({ name, email, password }) {
  const users = readUsers();
  const user = { id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name, email, password, role: 'user', created_at: new Date().toISOString() };
  users.push(user); writeUsers(users); return user;
}
function listUsers() {
  return readUsers().map(({ password, ...user }) => user);
}
function setRole(email, role) {
  const users = readUsers();
  const user = users.find(u => u.email === email);
  if (!user) return false;
  user.role = role; writeUsers(users); return true;
}
module.exports = { findUserByEmail, findUserById, createUser, listUsers, setRole };
