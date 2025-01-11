
const express = require('express');
const authMiddleware = require('./auth').authMiddleware;

const router = express.Router();

router.post('/receive', authMiddleware, async (req, res) => {
    res.send('File received');
});

router.post('/release', authMiddleware, async (req, res) => {
    res.send('File released');
});

module.exports = router;
    