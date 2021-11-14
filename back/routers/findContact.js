'use strict'
const express = require('express');
const router = express.Router();
const Contact = require('../model/Contacts');

router.get('/:name', (req, res) => {
    Contact.findOne({
      name: { $regex: `${req.params.name}\\b`, $options: 'i' },
    }).then((contact) => {
      if (contact) {
        res.json(contact);
      } else {
        res.status(400).send('Contact does not exist!');
      }
    }).catch(err=>{
      console.log(err)
      res.status(500).send('Contact could not be found!');
    })
  });

module.exports = router