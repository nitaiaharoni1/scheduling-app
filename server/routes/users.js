const express = require('express');
const router = express.Router();
const dao = require("../dao/dao");
const jwt = require('jsonwebtoken');
const path = require("path");
const SECRET = 'secret';
const users_db = path.join(__dirname, "../db_data/users_db.json");
const organizations_db = path.join(__dirname, "../db_data/organizations_db.json");

router.get('/auth', (req, res) => {
    try {
        if (req.cookies && req.cookies.roomer_token) {
            const jsonUsers = dao.readJson(users_db);
            const token = req.cookies.roomer_token;
            const decoded = jwt.verify(token, SECRET);
            if (jsonUsers[decoded.username]) {
                const jsonOrganizations = dao.readJson(organizations_db);
                const username = decoded.username;
                const organization = jsonUsers[username].organization;
                res.status(200).json({
                    msg: 'Auth successful',
                    userData: jsonUsers[decoded.username],
                    organizationData: jsonOrganizations[organization]
                });
            } else {
                res.status(500).json({msg: 'Auth failed... there is no user with this token'});
            }
        } else {
            res.status(500).json({msg: 'Auth failed... there is no cookie'});
        }
    } catch (e) {
        res.status(500).json({msg: e.message});
    }
});

router.post('/login', (req, res) => {
    try {
        const {username, password, checkbox} = req.body;
        const jsonUsers = dao.readJson(users_db);
        if (jsonUsers[username] && jsonUsers[username].password === password) {
            const {organization} = jsonUsers[username];
            const jsonOrganizations = dao.readJson(organizations_db);
            if (jsonOrganizations[organization]) {
                if (checkbox) {
                    const token = jwt.sign({username}, SECRET);
                    res.cookie('roomer_token', token);
                }
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

router.post('/logout', (req, res) => {
    try {
        res.clearCookie('roomer_token');
        res.status(200).send({"msg": 'Success'});
    } catch (e) {
        res.status(400).send({"msg": "Can't logout"});
    }
});

router.post('/signup', (req, res) => {
    try {
        const {firstName, lastName, username, password, email, organization} = req.body;
        let jsonUsers = dao.readJson(users_db);
        if (username && !jsonUsers[username]) {
            const newUser = {
                firstName, lastName, username, password, email, organization
            };
            jsonUsers[username] = newUser;
            dao.writeJson(users_db, jsonUsers);
            const jsonOrganizations = dao.readJson(organizations_db);
            if (jsonOrganizations[organization]) {
                return res.status(200).json({"msg": "Success", userData: newUser, organizationData: jsonOrganizations[organization]});
            }else {
                return res.status(400).json({"msg": `Organization ${organization} does not exists`});
            }
        } else {
            return res.status(400).json({"msg": "Username is already taken"});
        }
    } catch (e) {
        return res.status(400).json({"error": e.message});
    }
});

module.exports = router;
