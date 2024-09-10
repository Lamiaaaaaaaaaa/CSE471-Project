const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1]; // Remove "Bearer" prefix

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);
        req.user = await User.findById(_id).select('_id username email profilePicture'); // Attach the user to the request
        next();
    } catch (error) {
        console.error('Auth error:', error.message);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = authMiddleware;
