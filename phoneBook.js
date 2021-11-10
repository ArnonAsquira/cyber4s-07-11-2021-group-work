const express  = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const morgan = require('morgan');
require('dotenv').config()
const PhoneBook = require('./mongo')
const {errorHandler , unknownEndpoint} = require('./Middlewear/middlewear')

app.listen(port, (error) => {  //server initialization
    if(error) {
        console.log(error);
        return;
    }
    console.log(`listening on port ${port}`);
});

app.use(cors({
    origin: '*',
    methods: '*'
}));
app.use(express.json());

app.use(express.static('./dist'))
app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/dist/index.html");
})

//morgan
app.use(morgan('tiny'));
morgan.token('body', function (req, res) {if(req.body) return  JSON.stringify(req.body) });
app.use(morgan(':body'));

//ports - with mongoDB usage
app.get('/api/persons', (req,res)=>{
    PhoneBook.find({}).then(result=>{
        res.json(result);
    })
})
app.get('/info', async (req,res)=>{
    const length = (await PhoneBook.find({})).length
    res.send(`PhoneBook has info for ${length} <br> ${new Date()}`)
})
app.get('/api/persons/:id', async (req,res,next)=>{
    try {    
        const id = req.params.id;
        const contact = await PhoneBook.find({identifier:id});
        res.json(contact);
    } catch (error) {
        next('Not Found!')
        // res.status(404).send('Not Found!')
    }
})
app.delete('/api/persons/:id', async(req,res,next)=>{
    try {    
        const id = req.params.id;
        await PhoneBook.find({identifier:id}).remove()
        res.status(202).send(`deleted ${id} successfully!`)
    } catch (error) {
        next('Not Found!')
        // res.status(404).send('Not Found!')
    }
})
app.post('/api/persons', async(req,res,next)=>{
    const {name,number} = req.body;
    try {
        const id = await generateId();
        const contact = await new PhoneBook({identifier:id,name,number});
        await contact.save(); 
        res.send('Saved Successfully');
    } catch (error) {
            next(error)
            // res.status(400).send(error.message);
    }
})

//middlewear
app.use(unknownEndpoint)
app.use(errorHandler);

//helping funcs
const generateId = async() => {
    const data = await PhoneBook.find({})
    const length = data.length
    let maxId =0;
    for(let i=0; i<length; i++)
    {   
        if(+data[i].identifier>maxId){
            maxId= data[i].identifier;
        }
    }
    return +maxId + 1
  }

/* -----pre mongo Uses------- */
// data array
// let phoneBook = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]
// // ports
// app.get('/api/persons', (req,res)=>{
//     res.json(phoneBook);
// })
// app.get('/info', (req,res)=>{
//     res.send(`PhoneBook has info for ${phoneBook.length} <br> ${new Date()}`)
// })
// app.get('/api/persons/:id', (req,res)=>{
//     const id = req.params.id;
//     const person =phoneBook.find(person=> person.id == id);
//     if(person){
//         res.json(person);
//     }
//     else{
//         res.status(404).send('Not Found!')
//     }
// })
// app.delete('/api/persons/:id', (req,res)=>{
//     const id = req.params.id;
//     phoneBook = phoneBook.filter(book=>book.id!= id)
//     res.status(202).send(`deleted ${id} successfully!`)
// })
// app.post('/api/persons', (req,res)=>{
//     const data = req.body;
//     data.id = generateId();
//     if(errorhandler(data) == 'ok'){
//         phoneBook.push(data);
//         res.json(phoneBook);
//     }
//     else{
//         if(errorhandler(data) == 'exists')  res.status(400).send("name already exists")
//         if(errorhandler(data) == 'invalid') res.status(400).send("invalid Data")
//     }
// })



// //middlewear
// const unknownEndpoint = (request, response) => {
//     response.status(404).send({ error: 'unknown endpoint' })
// }
// app.use(unknownEndpoint)

// //helping funcs
// const generateId = async() => {
//     const data = await PhoneBook.find({})
//     const length = data.length
//     let maxId =0;
//     for(let i=0; i<length; i++)
//     {   
//         if(+data[i].id>maxId){
//             maxId= data[i].id;
//         }
//     }
//     return +maxId + 1
//   }

// function errorhandler(data){
//     if(phoneBook.find(book => book.name == data.name)) return 'exists';
//     if(data.name && data.number) return 'ok';
//     return 'invalid'
// }