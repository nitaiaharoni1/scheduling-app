const express = require('express');
const router = express.Router();
const dao = require("../dao/dao");
const path = require("path");
const events_db = path.join(__dirname, "../db_data/events_db.json");

router.get('/:organization/:room', (req, res) => {
    try {
        const {organization, room} = req.params;
        const json = dao.readJson(events_db);
        if (json[organization] && json[organization][room] && json[organization][room].events) {
            return res.status(200).json({"msg": "Success", events: json[organization][room].events});
        } else {
            return res.status(400).json({"msg": `Room: ${room} or Organization: ${organization} does not exists`});
        }
    } catch (e) {
        return res.status(400).json({"error": e.message});
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
            return res.status(200).json({"msg": "Success", events: json[organization][room].events});
        } else {
            return res.status(400).json({"msg": `Room: ${room} or Organization: ${organization} does not exists`});
        }
    } catch (e) {
        return res.status(400).json({"error": e.message});
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
            return res.status(200).json({"msg": "Success", events: json[organization][room].events});
        } else {
            return res.status(400).json({"msg": `Room: ${room} or Organization: ${organization} does not exists`});
        }
    } catch (e) {
        return res.status(400).json({"error": e.message});
    }
});

router.delete('/all/:organization', (req, res) => {
    try {
        const {organization} = req.params;
        const json = dao.readJson(events_db);
        if (json[organization]) {
            for (let room in json[organization]) {
                json[organization][room].events = [];
            }
            dao.writeJson(events_db, json);
            return res.status(200).json({"msg": "Success", organization: organization, events: json[organization]});
        } else {
            return res.status(400).json({"msg": `Room: ${room} or Organization: ${organization} does not exists`});
        }
    } catch (e) {
        return res.status(400).json({"error": e.message});
    }
});

router.delete('/:organization/:room', (req, res) => {
    try {
        const {organization, room} = req.params;
        const ids = Object.values(req.query);
        const json = dao.readJson(events_db);
        if (ids && json[organization] && json[organization][room] && json[organization][room].events) {
            json[organization][room].events = json[organization][room].events.filter(event => !ids.includes(event.id));
            dao.writeJson(events_db, json);
            return res.status(200).json({"msg": "Success", events: json[organization][room].events});
        } else {
            return res.status(400).json({"msg": `Room: ${room} or Organization: ${organization} does not exists`});
        }
    } catch (e) {
        return res.status(400).json({"error": e.message});
    }
});
module.exports = router;
