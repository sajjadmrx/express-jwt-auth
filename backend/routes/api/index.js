const express = require('express');

const router = express.Router();


// routes
const authRoutes = require('./auth');


router.use('/auth', authRoutes);


module.exports = router;