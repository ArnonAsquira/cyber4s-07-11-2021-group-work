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
//app.use('/', getRouters);
app.get('/api/persons/', (req, res) => {
    Entry.find({})
    .then(result => {
        res.json(result);
        // mongoose.connection.close();
    })
    .catch(error => {
        console.log(error);
        res.status(500).send(error);
    })
})

app.get('/api/persons/:id', (req, res) => {
    Entry.find({id: req.params.id})
    .then(result => {
        res.json(result);
        // mongoose.connection.close();
    })
    .catch(error => {
        console.log(error);
        res.status(500).send(error);
    })
})

 // deleting specific entry by id
app.use('/api/persons/', deleteRouter);

// creating a new entry 
app.post('/api/persons/', (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) {
        res.status(403).send('entry must have a name and a number');
    }

    const entry = new Entry({
        name: body.name, 
        number: body.number
    })

    entry.save()
    .then(savedEntry => {
        res.json(savedEntry)
    })
});


app.use((req, res) => {
    res.status(404).send('unkown endpoint')
});


app.listen(port, (error) => {
    if(error) {
        console.log(error);
        return;
    }
    console.log(`listening on port ${port}`);
});