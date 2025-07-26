
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

    res.cookie('token', token)

    res.status(201).json({
        message: 'User registered successfully',
        user
    })

});

router.post('/login', async (req, res) => {
    // Handle user login
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    const isPasswordValid = user.password === password;
    if (!isPasswordValid) {
        return res.status(401).json({
            message: 'Invalid password'
        });
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET);

    // res.cookie('token', token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //     sameSite: 'strict'
    // });
    res.cookie('token', token,{
        expires:new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    })

    res.status(200).json({
        message: 'Login successful',
        user
    });
});

router.get('./user', async (req, res) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    // Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {

    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    
    res.status(200).json({
        message: 'Logged out successfully'
    });

})

module.exports = router;