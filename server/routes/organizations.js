const express = require('express');
const router = express.Router();
const dao = require("../dao/dao");
const path = require("path");
const organizations_db = path.join(__dirname, "../db_data/organizations_db.json");

//Gets all available organization names for user sign up
router.get('/', (req, res) => {
    try {
        const organizationsJson = dao.readJson(organizations_db);
        const organizationsNames = Object.keys(organizationsJson)
        return res.status(200).send({"msg": "Success", organizations: organizationsNames});
    } catch (e) {
        console.error( e.message);
        return res.status(400).send({"error": e.message});
    }
});

module.exports = router;
