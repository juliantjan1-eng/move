const express = require('express');
const router = express.Router();
const { handleStats } = require('../controllers/adminController');

router.get('/stats', handleStats);

module.exports = router;
