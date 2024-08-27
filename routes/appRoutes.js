const express = require('express');
const router = express.Router();

// Import controllers
const homeController = require('../controllers/homeController');
const messageController = require('../controllers/messageController');
const userController = require('../controllers/userController');
const sampleDevController = require('../controllers/sampleDevController');

// Define routes
router.get('/', homeController.index);
router.get('/home', homeController.index);
router.get('/message', messageController.index);
router.get('/users', userController.index);
router.get('/sample/sample_dev/', sampleDevController.index);

module.exports = router;