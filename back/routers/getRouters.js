const express = require('express');
const Router = express.Router();
const fs = require('fs');
const path = require('path');


Router.use(express.json());

Router.get('/api/persons/:id',  (req, res) => {
    fs.readFile(path.resolve(__dirname, '../phoneBookDB.json'), (error, data) => {
        if (error) {
            console.log(error);
            res.status(400).send('file not found')
            return;
        }else {
            const phoneBook = JSON.parse(data);
            const requiredEntry = phoneBook.find(entry => entry.id === Number(req.params.id));
            if (requiredEntry) {
                res.json(requiredEntry);
            } else {
                res.status(400).send('non existent entry id')
            }
        }
    });
})

Router.get('/info', (req, res) => {
    fs.promises.readFile(path.resolve(__dirname, '../phoneBookDB.json'), 'utf-8')
    .then(data => {  
        const phoneBook = JSON.parse(data)
        res.send(`phoneBook has info for ${phoneBook.length} people
        ${new Date()}`)
    })
    .catch(error => res.status(400).send('file not found'));
})

Router.get('/api/persons',(req, res) => {
    fs.promises.readFile(path.resolve(__dirname, '../phoneBookDB.json'), 'utf-8')
    .then(data => res.json(JSON.parse(data)))
    .catch(error => res.status(400))
})



module.exports = Router;