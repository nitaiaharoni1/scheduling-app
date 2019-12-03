const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const path = require("path");
const dao = require("../dao/dao");
const authToken = require("../utils/auth");
const capitalizeName = require("../utils/functions");
const users_db = path.join(__dirname, "../db_data/users_db.json");
const organizations_db = path.join(__dirname, "../db_data/organizations_db.json");

//Get initial user data
router.get('/data', authToken, (req, res) => {
    try {
        if (req.cookies && req.cookies.roomer_token) {
            const jsonUsers = dao.readJson(users_db);
            const token = req.cookies.roomer_token;
            const decoded = jwt.verify(token, process.env.SECRET);
            if (jsonUsers[decoded.email]) {
                const jsonOrganizations = dao.readJson(organizations_db);
                const email = decoded.email;
                const organization = jsonUsers[email].organization;
                res.status(200).json({
                    msg: 'Auth successful',
                    userData: jsonUsers[decoded.email],
                    organizationData: jsonOrganizations[organization]
                });
            } else {
                res.status(204).json({msg: 'Auth failed... there is no user with this token'});
            }
        } else {
            res.status(204).json({msg: 'Auth failed... there is no cookie'});
        }
    } catch (e) {
        res.status(500).json({msg: e.message});
    }
});

//User login
router.post('/login', (req, res) => {
    try {
        const {email, password, checkbox} = req.body;
        const jsonUsers = dao.readJson(users_db);
        if (jsonUsers[email] && jsonUsers[email].password === password) {
            const {organization} = jsonUsers[email];
            const jsonOrganizations = dao.readJson(organizations_db);
            if (jsonOrganizations[organization]) {
                let token;
                if (checkbox) {
                    token = jwt.sign({email}, process.env.SECRET, {expiresIn: '5h'});
                } else {
                    token = jwt.sign({email}, process.env.SECRET, {expiresIn: 60 * 10});
                }
                res.cookie('roomer_token', token);
                return res.status(200).json({"msg": "Success", userData: jsonUsers[email], organizationData: jsonOrganizations[organization]});
            } else {
                return res.status(400).json({"msg": `Organization ${organization} does not exists`});
            }
        } else {
            return res.status(400).json({"msg": "Email or password is incorrect"});
        }
    } catch (e) {
        console.error(e.message);
        return res.status(400).json({"error": e.message});
    }
});

//User logout
router.post('/logout', (req, res) => {
    try {
        res.clearCookie('roomer_token');
        res.status(200).send({"msg": 'Success'});
    } catch (e) {
        console.error(e.message);
        res.status(400).send({"msg": "Can't logout"});
    }
});

//New user sign up
router.post('/signup', (req, res) => {
    try {
        const {firstName, lastName, password, email, organization} = req.body;
        let jsonUsers = dao.readJson(users_db);
        if (email && !jsonUsers[email]) {
            let capitalizeFirst = capitalizeName(firstName);
            let capitalizeLast = capitalizeName(lastName);
            const newUser = {
                firstName: capitalizeFirst, lastName: capitalizeLast, password, email, organization
            };
            jsonUsers[email] = newUser;
            dao.writeJson(users_db, jsonUsers);
            const jsonOrganizations = dao.readJson(organizations_db);
            if (jsonOrganizations[organization]) {
                const token = jwt.sign({email}, process.env.SECRET, {expiresIn: '5h'});
                res.cookie('roomer_token', token);
                return res.status(200).json({"msg": "Success", userData: jsonUsers[email], organizationData: jsonOrganizations[organization]});
            } else {
                return res.status(400).json({"msg": `Organization ${organization} does not exists`});
            }
        } else {
            return res.status(400).json({"msg": "Email is already taken"});
        }
    } catch (e) {
        console.error(e.message);
        return res.status(400).json({"error": e.message});
    }
});

module.exports = router;
