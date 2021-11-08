const express  = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const morgan = require('morgan')
app.use(cors({
    origin: '*',
    methods: '*'
}));
app.use(express.json());
app.use(express.static('./src'))
app.use('/', (req,res)=>{
    res.sendFile('./src/index.html');
})

//morgan
app.use(morgan('tiny'));
morgan.token('body', function (req, res) {if(req.body) return  JSON.stringify(req.body) });
app.use(morgan(':body'));

app.listen(port, (error) => {
    if(error) {
        console.log(error);
        return;
    }
    console.log(`listening on port ${port}`);
});
// data array
let phoneBook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
// ports
app.get('/api/persons', (req,res)=>{
    res.json(phoneBook);
})
app.get('/info', (req,res)=>{
    res.send(`PhoneBook has info for ${phoneBook.length} <br> ${new Date()}`)
})
app.get('/api/persons/:id', (req,res)=>{
    const id = req.params.id;
    const person =phoneBook.find(person=> person.id == id);
    if(person){
        res.json(person);
    }
    else{
        res.status(404).send('Not Found!')
    }
})
app.delete('/api/persons/:id', (req,res)=>{
    const id = req.params.id;
    phoneBook = phoneBook.filter(book=>book.id!= id)
    res.status(202).send(`deleted ${id} successfully!`)
})
app.post('/api/persons', (req,res,next)=>{
    const data = req.body;
    data.id = generateId();
    if(errorhandler(data) == 'ok'){
        phoneBook.push(data);
        res.json(phoneBook);
    }
    else{
        if(errorhandler(data) == 'exists')  res.status(400).send("name already exists")
        if(errorhandler(data) == 'invalid') { res.status(400).send("invalid Data")}
    }
})



//middlewear
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

//helping funcs
const generateId = () => {
    const maxId = phoneBook.length > 0
      ? Math.max(...phoneBook.map(n => n.id))
      : 0
    return maxId + 1
  }

function errorhandler(data){
    if(phoneBook.find(book => book.name == data.name)) return 'exists';
    if(data.name && data.number) return 'ok';
    return 'invalid'
}