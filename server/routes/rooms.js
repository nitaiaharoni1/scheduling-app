const express = require('express');
const router = express.Router();
const dao = require("../dao/dao");
const path = require("path");
const rooms_db = path.join(__dirname, "../db_data/rooms_db.json");

router.get('/:organization/:room', (req, res) => {
    try {
        const {organization, room} = req.params;
        const json = dao.readJson(rooms_db);
        if (json[organization] && json[organization][room] && json[organization][room].events) {
            return res.status(200).send({"msg": "Success", events: json[organization][room].events});
        } else {
            return res.status(400).send({"msg": `Room: ${room} or Organization: ${organization} does not exists`});
        }
    } catch (e) {
        return res.status(400).send({"error": e.message});
    }
});

router.put('/:organization/:room', (req, res) => {
    try {
        const {organization, room} = req.params;
        const newEvents = req.body;
        const json = dao.readJson(rooms_db);
        if (newEvents && json[organization] && json[organization][room] && json[organization][room].events) {
            json[organization][room].events = newEvents;
            dao.writeJson(rooms_db, json);
            return res.status(200).send({"msg": "Success", data: json[room]});
        } else {
            return res.status(400).send({"msg": `Room ${room} does not exists`});
        }
    } catch (e) {
        return res.status(400).send({"error": e.message});
    }
});

module.exports = router;
