/*
const express = require('express');
const router = express.Router();
const dao = require("../dao/dao");
const organizations_db = "../db_data/organizations_db.json";

router.get('/:organization', (req, res) => {
    try {
        const {organization} = req.params;
        const json = dao.readJson(organizations_db);
        if (json[organization]) {
            return res.status(200).send({"msg": "Success", data: json[organization]});
        } else {
            return res.status(400).send({"msg": `Organization ${organization} does not exists`});
        }
    } catch (e) {
        return res.status(400).send({"error": e.message});
    }
});

module.exports = router;
*/
