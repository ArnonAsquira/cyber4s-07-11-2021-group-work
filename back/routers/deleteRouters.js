const express = require('express');
const Router = express.Router();
const fs = require('fs');
const path = require('path');

Router.delete('/:id', (req, res) => {
    fs.promises.readFile(path.resolve(__dirname, '../phoneBookDB.json'), 'utf-8')
    .then(data => {  
        console.log(req.params.id)
        const phoneBook = JSON.parse(data);
        let index = 0;
        phoneBook.forEach(entry => {
            if (entry.id === Number(req.params.id)) {
              phoneBook.splice(index, 1);
            } 
            index ++;
        });
        fs.promises.writeFile(path.resolve(__dirname, '../phoneBookDB.json'), JSON.stringify(phoneBook))
        res.status(204).end()})
    .catch(error => res.status(400));
})






module.exports = Router;
