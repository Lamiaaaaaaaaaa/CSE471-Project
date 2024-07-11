const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' }); // Expires in 3 days
};

// Login user authentication with token
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, user, token });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(400).json({ error: error.message });
    }
};

// Sign up user
const signupUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Received signup request:', req.body); // Log the incoming request data

    try {
        const user = await User.signup(name, email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, user, token });
    } catch (error) {
        console.error('Signup error:', error.message);
        res.status(400).json({ error: error.message });
    }
};

module.exports = { signupUser, loginUser };
