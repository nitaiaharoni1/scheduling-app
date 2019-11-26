const express = require('express');
const router = express.Router();
const dao = require("../dao/dao");
const path = require("path");
const organizations_db = path.join(__dirname, "../db_data/organizations_db.json");

router.get('/', (req, res) => {
    try {
        const organizationsJson = dao.readJson(organizations_db);
        const organizationsNames = Object.keys(organizationsJson)
        return res.status(200).send({"msg": "Success", organizations: organizationsNames});
    } catch (e) {
        return res.status(400).send({"error": e.message});
    }
});

router.put('/:organization/:room', (req, res) => {
    try {
        const {organization, room} = req.params;
        const updatedEvent = req.body;
        const json = dao.readJson(events_db);
        if (updatedEvent && json[organization] && json[organization][room] && json[organization][room].events) {
            json[organization][room].events = json[organization][room].events.map(event => {
                if (event.id === updatedEvent.id) {
                    return updatedEvent;
                } else {
                    return event;
                }
            });
            dao.writeJson(events_db, json);
            return res.status(200).send({"msg": "Success", events: json[organization][room].events});
        } else {
            return res.status(400).send({"msg": `Room: ${room} or Organization: ${organization} does not exists`});
        }
    } catch (e) {
        return res.status(400).send({"error": e.message});
    }
});

router.post('/:organization/:room', (req, res) => {
    try {
        const {organization, room} = req.params;
        const newEvent = req.body;
        const json = dao.readJson(events_db);
        if (newEvent && json[organization] && json[organization][room] && json[organization][room].events) {
            json[organization][room].events.push(newEvent);
            dao.writeJson(events_db, json);
            return res.status(200).send({"msg": "Success", events: json[organization][room].events});
        } else {
            return res.status(400).send({"msg": `Room: ${room} or Organization: ${organization} does not exists`});
        }
    } catch (e) {
        return res.status(400).send({"error": e.message});
    }
});

module.exports = router;
