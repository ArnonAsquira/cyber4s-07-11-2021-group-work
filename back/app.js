'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;
require('dotenv').config()
const getPhonebook = require('./routers/getPhonebook')
const findContact = require('./routers/findContact');
const deleteContact = require('./routers/deleteContact');
const addContact = require('./routers/addContact')
const updateContact = require('./routers/updateContact')
 
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
 
mongoose
  .connect(process.env.dbUri)
  .then((res) => {
    app.listen(port, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

app.use('/', express.static('./dist'));

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

app.use('/api/persons', getPhonebook)
app.use('/api/persons', findContact)
app.use('/api/persons', deleteContact)
app.use('/api/persons', addContact)
app.use('/api/persons', updateContact)