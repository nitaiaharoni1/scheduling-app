const express = require('express');
const path = require('path');
const router = express.Router();

//Serves react client static files
router.get('*', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../../client/build/index.html'));
    } catch (e) {
        console.error( e.message);
        res.status(500).send({msg: e.message});
    }
});

module.exports = router;


