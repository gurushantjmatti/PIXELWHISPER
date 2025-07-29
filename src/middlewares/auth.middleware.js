const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model'); // Assuming you have a user model

async function authmiddleware(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModelfindone(
            {
                _id: decoded.id

            })
        req.user = user
        next()

    } catch (err) {
        return res.status(401).json({
            message: 'Invalid token please login again'
        })
    }
}

module.exports = authmiddleware;