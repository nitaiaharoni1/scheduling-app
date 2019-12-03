const express = require('express');
const router = express.Router();
const authToken = require("../utils/auth");
const dao = require("../dao/dao");
const path = require("path");
const events_db = path.join(__dirname, "../db_data/events_db.json");


//Gets all events in an organization's room
router.get('/:organization/:room', authToken, (req, res) => {
    try {
        const {organization, room} = req.params;
        const json = dao.readJson(events_db);
        if (json[organization] && json[organization][room] && json[organization][room].events) {
            return res.status(200).json({"msg": "Success", events: json[organization][room].events});
        } else {
            return res.status(400).json({"msg": `Room: ${room} or Organization: ${organization} does not exists`});
        }
    } catch (e) {
        console.error(e.message);
        return res.status(400).json({"error": e.message});
    }
});

//Updates existing event in an organization's room
router.put('/:organization/:room', authToken, (req, res) => {
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
        console.error(e.message);
        return res.status(400).json({"error": e.message});
    }
});

//Adds new event in an organization's room
router.post('/:organization/:room', authToken, (req, res) => {
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
        console.error(e.message);
        return res.status(400).json({"error": e.message});
    }
});

//Deletes all events in an organization's room (api only)
router.delete('/all/:organization', authToken, (req, res) => {
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
        console.error(e.message);
        return res.status(400).json({"error": e.message});
    }
});

//Deletes an existing event in an organization's room
router.delete('/:organization/:room/:id', authToken, (req, res) => {
    try {
        const {organization, room, id} = req.params;
        const json = dao.readJson(events_db);
        if (id && json[organization] && json[organization][room] && json[organization][room].events) {
            json[organization][room].events = json[organization][room].events.filter(event => event.id !== id);
            dao.writeJson(events_db, json);
            return res.status(200).json({"msg": "Success", events: json[organization][room].events});
        } else {
            return res.status(400).json({"msg": `Room: ${room} or Organization: ${organization} does not exists`});
        }
    } catch (e) {
        console.error(e.message);
        return res.status(400).json({"error": e.message});
    }
});

module.exports = router;
