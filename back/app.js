const express  = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const deleteRouter = require('./routers/deleteRouters');
const getRouters = require('./routers/getRouters');
const postRouters = require('./routers/postRouters');
const morgan = require('morgan');
const serveStatic = require('serve-static');
const Entry = require('../mongoosePhoneBookModuel');
const { Mongoose } = require('mongoose');

// intilizing the app
const app = express();

app.use(express.json()) // parses request body to json

const port = process.env.PORT || 3001;

// disableling cors
app.use(cors({
    origin: '*',
    methods: '*'
}));

// serving the javascript file for the index html staticly so that it can be used
app.use(express.static(path.resolve(__dirname,`../dist`)));

// serving the index html file to the client for interaction with the rest of the api
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"));
});

// morgan middleware
app.use(morgan(function (tokens, req, res) {
    return  [
        req.method,
        res.statusCode,
        JSON.stringify(req.body)]
  }));


// retrieving all the phone book object
app.get('/api/persons/', (req, res) => {
    console.log('sndgabkjfdsakfljahsdlkjfhasdlkfhaslkjfhdlk');
    Entry.find({})
    .then(result => {
        res.json(result);
    })
    .catch(error => {
        console.log(error);
        res.status(500).send(error);
    })
})
// getting a single entry
app.get('/api/persons/:id', (req, res) => {
    console.log(req.params.id);
    Entry.find({name: req.params.id})
    .then(result => {
        res.json(result);
    })
    .catch(error => {
        console.log(error);
        res.status(500).send(error);
    })
})

 // deleting specific entry by id
app.delete('/api/persons/:id', (req, res) => {
    Entry.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
});

// creating a new entry // very wierd beahvaiour, i dont know what the f is going on here 
app.post('/api/persons/', async (req, res, next) => {
    const body = req.body;
    if (!body.name || !body.number) {
        res.status(403).send(body);
        return;
    }
   const data = await Entry.find({name: body.name});
   if (!data[0]) {
    const newEntry = new Entry({
        name: body.name, 
        number: body.number
    })
    newEntry.save()
    .then(savedEntry => {
        res.json(savedEntry);
    })
    .catch(error => {throw error})
       return;
   }
    if (data[0].name) {
        res.status(201).send(data[0].id);
        throw 'sent an update message to use';
    } 
});

// updating entry
app.put('/api/persons/:id', (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) {
        res.status(403).send(body);
        return;
    }
    const entry  = {
        name: body.name,
        number: body.number
    }
    Entry.findByIdAndUpdate(req.params.id, entry, {new: true})
    .then(updateEntry => {
       res.json(updateEntry)
    })
    .catch(error => {
        res.status(500).send(error)
        // next(error);
    })
})

// error handeling middleware
app.use((error, req, res, next) => {
    if (error ===  'sent an update message to use') {
       return;
    }
    res.status(400).send(error);
})

// error handler for unknown endpoint
app.use((req, res) => {
    res.status(404).send(req);
});

// activating the serevr
app.listen(port, (error) => {
    if(error) {
        console.log(error);
        return;
    }
    console.log(`listening on port ${port}`);
});