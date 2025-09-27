const pool = require('../db');
const bcrypt = require('bcrypt');

// List users
exports.getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, full_name, email, role, created_at FROM users'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, full_name, email, role FROM users WHERE id = ?',
      [req.params.id]
    );
    res.json(rows[0] || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create user
exports.createUser = async (req, res) => {
  try {
    const { username, password, full_name, email, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (username, password, full_name, email, role) VALUES (?,?,?,?,?)',
      [username, hashed, full_name, email, role || 'staff']
    );

    res.json({ message: 'User created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { full_name, email, role, password } = req.body;

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      await pool.query(
        'UPDATE users SET full_name=?, email=?, role=?, password=? WHERE id=?',
        [full_name, email, role, hashed, req.params.id]
      );
    } else {
      await pool.query(
        'UPDATE users SET full_name=?, email=?, role=? WHERE id=?',
        [full_name, email, role, req.params.id]
      );
    }

    res.json({ message: 'Updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id=?', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
