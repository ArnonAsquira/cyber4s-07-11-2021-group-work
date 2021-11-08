const express  = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const deleteRouter = require('./routers/deleteRouters');
const getRouters = require('./routers/getRouters');
const postRouters = require('./routers/postRouters');
const morgan = require('morgan');
const serveStatic = require('serve-static');

const app = express();

app.use(express.json())

const port = process.env.PORT || 3001;

app.use(cors({
    origin: '*',
    methods: '*'
}));

app.use(express.static(`../dist`));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"));
});


app.use(morgan(function (tokens, req, res) {
    return  [
        req.method,
        res.statusCode,
        JSON.stringify(req.body)]
  }));

// retrieving all the phone book object
app.use('/', getRouters);

 // deleting specific entry by id
app.use('/api/persons/', deleteRouter);

// creating a new entry 
app.use('/api/persons/', postRouters);


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