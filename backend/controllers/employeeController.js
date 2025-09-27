const pool = require('../db');
const fs = require('fs');
const sharp = require('sharp');

// List employees
exports.getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employees');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employees WHERE id=?', [req.params.id]);
    res.json(rows[0] || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create employee (with photo upload)
exports.createEmployee = async (req, res) => {
  try {
    const { nik, name, position, phone, email } = req.body;
    let photoPath = null;

    if (req.file) {
      const filepath = req.file.path;
      await sharp(filepath)
        .resize({ width: 800, withoutEnlargement: true })
        .toFile(filepath + '_tmp');
      fs.renameSync(filepath + '_tmp', filepath);
      photoPath = req.file.filename;
    }

    await pool.query(
      'INSERT INTO employees (nik, name, position, phone, email, photo) VALUES (?,?,?,?,?,?)',
      [nik, name, position, phone, email, photoPath]
    );

    res.json({ message: 'Created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update employee (with optional photo replace)
exports.updateEmployee = async (req, res) => {
  try {
    const { nik, name, position, phone, email } = req.body;

    if (req.file) {
      const filepath = req.file.path;
      await sharp(filepath)
        .resize({ width: 800, withoutEnlargement: true })
        .toFile(filepath + '_tmp');
      fs.renameSync(filepath + '_tmp', filepath);

      const photoPath = req.file.filename;

      // delete old photo
      const [rows] = await pool.query('SELECT photo FROM employees WHERE id=?', [req.params.id]);
      if (rows[0] && rows[0].photo) {
        const old = `uploads/${rows[0].photo}`;
        if (fs.existsSync(old)) fs.unlinkSync(old);
      }

      await pool.query(
        'UPDATE employees SET nik=?, name=?, position=?, phone=?, email=?, photo=? WHERE id=?',
        [nik, name, position, phone, email, photoPath, req.params.id]
      );
    } else {
      await pool.query(
        'UPDATE employees SET nik=?, name=?, position=?, phone=?, email=? WHERE id=?',
        [nik, name, position, phone, email, req.params.id]
      );
    }

    res.json({ message: 'Updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT photo FROM employees WHERE id=?', [req.params.id]);

    if (rows[0] && rows[0].photo) {
      const old = `uploads/${rows[0].photo}`;
      if (fs.existsSync(old)) fs.unlinkSync(old);
    }

    await pool.query('DELETE FROM employees WHERE id=?', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
