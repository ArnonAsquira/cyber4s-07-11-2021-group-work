'use strict';
const express = require('express');
const router = express.Router();
const Contact = require('../model/Contacts');
const morgan = require('morgan');
const validateInput = require('../middleware/validateInput');
morgan.token('body', (req, res) => JSON.stringify(req.body));

router.post('', morgan(':body'), validateInput, (req, res) => {
  const phonebook = req.body.phonebook;

  const contact = new Contact({
    name: req.body.name,
    number: req.body.number,
  });

  contact
    .save()
    .then((newContact) => {
      phonebook.push(newContact);
      res
        .status(201)
        .json(
          phonebook.sort((contactA, contactB) =>
            contactA.name.localeCompare(contactB.name)
          )
        );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('We are having problems. Unable to save contact.');
    });
});

module.exports = router;
