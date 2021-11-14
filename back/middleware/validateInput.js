'use strict';
const Contact = require('../model/Contacts');
const parsePhoneNumber = require('libphonenumber-js');

async function validateInput(req, res, next) {
  if (!req.body.name) {
    res.status(400).send('You need to enter a name!');
    return;
  }
  if (!req.body.number) {
    res.status(400).send('You need to enter a phone number!');
    return;
  }
  const phoneNumberUs = parsePhoneNumber(req.body.number, 'US');
  const phoneNumberIl = parsePhoneNumber(req.body.number, 'IL');
  if (!phoneNumberUs.isValid() && !phoneNumberIl.isValid()) {
    res.status(400).send('Not a valid phone number!');
    return;
  }

  const phonebook = await Contact.find();
  for (const person of phonebook) {
    if (person.number === req.body.number) {
      res.status(400).send('This number is already in the phonebook!');
      return;
    }
    if (
      person.name.toLowerCase() === req.body.name.toLowerCase() &&
      req.method === 'POST'
    ) {
      res.status(409).send('This name is already in the phonebook! Would you like to update this contact?');
      return;
    }
  }
  req.body.phonebook = phonebook;
  next();
}

module.exports = validateInput;
