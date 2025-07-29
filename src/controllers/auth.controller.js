const { response } = require('../app');
const userModel = require('../models/user.model');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

//in this file only the logic will be written

async function registerController(req,res) {
    const { username, password } = req.body;

    const isUserAlreadyExistsuser = await userModel.findOne({ username});

    if( isUserAlreadyExistsuser) {
        return res.status(409).json({
            message: 'Username already exists'
        });
    }

    const user = await userModel.create({
        username,
        password: await bcrypt.hash(password, 10) //hashing the password
    });

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET);

    res.cookie('token', token);

    return res.status(201).json({
        message: 'User registered successfully',
        user
    });


    
}

async function loginController(req, res) {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: 'Invalid password'
        });
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET);

    res.cookie('token', token);

    res.status(200).json({
        message: 'User logged in successfully',
        user: {
            id: user._id,
            username: user.username
        }
    });

}

module.exports = {
    //export in the object
    registerController,
    loginController
}