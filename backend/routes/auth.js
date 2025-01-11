
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();
const SECRET_KEY = 'your_secret_key';

router.post('/register', async (req, res) => {
    try {
        const { username, password, section } = req.body;
        const newUser = new User({ username, password, section });
        await newUser.save();
        res.status(201).send('User registered');
    } catch (err) {
        res.status(500).send('Error registering user');
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        const token = jwt.sign({ id: user._id, section: user.section }, SECRET_KEY);
        res.json({ token });
    } catch (err) {
        res.status(500).send('Error logging in');
    }
});

module.exports = { router, authMiddleware: (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied');

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
}};
    