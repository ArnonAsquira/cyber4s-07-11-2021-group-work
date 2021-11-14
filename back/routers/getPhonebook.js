'use strict';
const express = require('express');
const router = express.Router();
const Contact = require('../model/Contacts');

router.get('', (req, res) => {
  Contact.find().sort({'name': 1})
    .then((contacts) => {
      res.send(contacts);
    })
    .catch(() => {
      res
        .status(500)
        .send(
          'We are having problems with our server. Webpage not opperable!'
        );
    });
});

module.exports = router;
