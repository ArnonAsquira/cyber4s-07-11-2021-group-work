const express = require('express');
const Router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const errorHandler = require('../middlewares/errorhandelingmiddlewares');

Router.use(express.json());

Router.post('/', errorHandler);

Router.post('/', (req, res) => {
    const body = req.body;
   fs.promises.readFile((path.resolve(__dirname, '../phoneBookDB.json')), 'utf-8')
   .then(data => {
       const phoneBook = JSON.parse(data);
       const newEntry = {
           name: body.name,
           number: body.number,
           id: uuidv4(),
           important: body.important || false
       }
       phoneBook.push(newEntry);
       fs.promises.writeFile(path.resolve(__dirname, '../phoneBookDB.json'), JSON.stringify(phoneBook));
       res.send('entry made');
   })
})

module.exports = Router;