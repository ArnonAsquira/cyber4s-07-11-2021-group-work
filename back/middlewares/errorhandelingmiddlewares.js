const express = require('express');
const Router = express.Router();
const fs = require('fs');
const path = require('path');

Router.use('', (req, res, next) => {
    console.log(req.body);
    if (!req.body.name || !req.body.number) {
        res.status(403).send('entry must include name and number');
        return;
    }
    const phoneBook = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../phoneBookDB.json'), 'utf-8'));
    const duplicateEntryName = phoneBook.find(entry => entry.name === req.body.name);
    if (duplicateEntryName) {
        res.status(403).send({error: 'name must be unique'});
        return;
    }
    next();
})


module.exports = Router;