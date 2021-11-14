'use strict';
const express = require('express');
const router = express.Router();
const Contact = require('../model/Contacts');

router.delete('/:name', (req, res) => {
  Contact.findOneAndRemove({ name: { $regex: `${req.params.name}\\b`, $options: 'i' } })
    .then(async (delCount) => {
      if (delCount) {
        res.status(202).json(await Contact.find().sort({'name': 1}));
        return;
      }
      res.status(400).send('Contact does not exist!');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Contact could not be deleted!');
    });
});

module.exports = router;
