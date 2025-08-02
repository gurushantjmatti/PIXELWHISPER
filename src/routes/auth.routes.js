const { registerController, loginController } = require('../controllers/auth.controller');


const express = require('express');


const router = express.Router();




router.post('/register', registerController);

router.post('/login', loginController);




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