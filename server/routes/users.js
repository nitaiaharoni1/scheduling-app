const express = require('express');
const router = express.Router();
const dao = require("../dao/dao");

const users_db = "./db_data/users_db.json";
const organizations_db = "./db_data/organizations_db.json";

router.post('/login', (req, res) => {
    try {
        const {username, password, checkbox} = req.body;
        const jsonUsers = dao.readJson(users_db);
        if (jsonUsers[username] && jsonUsers[username].password === password) {
            const {organization} = jsonUsers[username];
            const jsonOrganizations = dao.readJson(organizations_db);
            if (jsonOrganizations[organization]) {
                return res.status(200).json({"msg": "Success", userData: jsonUsers[username], organizationData: jsonOrganizations[organization]});
            } else {
                return res.status(400).json({"msg": `Organization ${organization} does not exists`});
            }
        } else {
            return res.status(400).json({"msg": "Username or password is incorrect"});
        }
    } catch (e) {
        return res.status(400).json({"error": e.message});
    }
});

router.post('/signup', (req, res) => {
    try {
        const {username, password, organization, firstName, lastName, email} = req.body;
        const json = dao.readJson(users_db);
        if (username && !json[username]) {
            const newUser = {
                [username]: {
                    password,
                    organization,
                    firstName,
                    lastName,
                    email
                }
            };
            dao.updateJson(users_db, json, newUser);
            return res.status(200).json({"msg": "Success"});
        } else {
            return res.status(400).json({"msg": "Username is already taken"});
        }
    } catch (e) {
        return res.status(400).json({"error": e.message});
    }
});

module.exports = router;
