const fs = require('fs');

function readJson(path) {
    try {
        return JSON.parse(fs.readFileSync(path, 'utf8'));
    } catch (e) {
        console.error(e);
        throw e;
    }
}

function writeJson(path, data) {
    try {
        fs.writeFileSync(path, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

function updateJson(path, json, data) {
    try {
        for (let key in data) {
            json[key] = data[key];
        }
        return writeJson(path, json)
    } catch (e) {
        console.error(e);
        throw e;
    }
}

function appendJson(path, data) {
    try {
        let json = readJson(path);
        for (let key in data) {
            json[key] = data[key];
        }
        return writeJson(path, json)
    } catch (e) {
        console.error(e);
        throw e;
    }
}

module.exports = {readJson, writeJson, updateJson, appendJson};