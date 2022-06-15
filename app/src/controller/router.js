const express = require('express');
const router = express.Router();
const authRoutes = require('./auth/authRoutes');


console.log("Inside global routes registration...")

router.use('/auth', authRoutes);