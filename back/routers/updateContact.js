'use strict';
const express = require('express');
const router = express.Router();
const Contact = require('../model/Contacts');
const morgan = require('morgan');
const validateInput = require('../middleware/validateInput');
morgan.token('body', (req, res) => JSON.stringify(req.body));

router.put('', morgan(':body'), validateInput, (req, res) => {
  Contact.findOneAndUpdate(
    { name: { $regex: `${req.body.name}\\b`, $options: 'i' } },
    { number: req.body.number }
  )
    .then(async (updatedContact) => {
      if (updatedContact) {
        res.status(200).json(await Contact.find().sort({ name: 1 }));
        return;
      }
      res.status(400).send('Contact does not exist!');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('We are having problems. Unable to save contact.');
    });
});

module.exports = router;
