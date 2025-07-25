
const express = require('express');
const UserModel = require('../models/user.model');

const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req, res) => {
    // Handle user registration
    const { username, password } = req.body;

    const existingUser = await UserModel.findOne({
        username
    });
    if (existingUser) {
        return res.status(409).json({
            message: 'Username already exists'
        });
    }

    const user = await UserModel.create({
        username,
        password
    })
    const token = jwt.sign({
        id: user._id

    }, process.env.JWT_SECRET)

    res.status(201).json({
        message: 'User registered successfully',
        user
    })

});

router.post('/login', (req, res) => {
    // Handle user login
});

module.exports = router;