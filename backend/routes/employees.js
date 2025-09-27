const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const employeeController = require('../controllers/employeeController');

// Routes
router.get('/', auth, employeeController.getEmployees);
router.get('/:id', auth, employeeController.getEmployeeById);
router.post('/', auth, upload.single('photo'), employeeController.createEmployee);
router.put('/:id', auth, upload.single('photo'), employeeController.updateEmployee);
router.delete('/:id', auth, employeeController.deleteEmployee);

module.exports = router;
