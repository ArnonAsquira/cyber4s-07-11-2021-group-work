const express  = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3030;
const Note = require('./model/note')

app.listen(port, (error) => {
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

//mongoose
app.get('/api/notes', (req,res)=>{
  Note.find({}).then(result=>{res.json(result)})
})
app.post('/api/notes', async(req,res)=>{
  const body= req.body;
  if (body.content === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }
  try {
    const note = await new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    })
    
    await note.save().then(savedNote => {
      res.json(savedNote)
    })
    
  } catch (error) {
    res.send(error.message)
  }
})
app.get('/notes/:id', async(req,res)=>{
    try {
      const id = req.params.id;
      const result = await Note.findById(id)
        res.json(result);
    } catch (error) {
      res.send('not existing Id')
    }
    })
    
// pre mongoose
// let notes = [
//     {
//       id: 1,
//       content: "HTML is easy",
//       date: "2019-05-30T17:30:31.098Z",
//       important: true
//     },
//     {
//       id: 2,
//       content: "Browser can execute only Javascript",
//       date: "2019-05-30T18:39:34.091Z",
//       important: false
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       date: "2019-05-30T19:20:14.298Z",
//       important: true
//     }
//   ]

// app.get('/notes/:id', (req,res)=>{
//       const id = req.params.id;
//       const note = notes.find(note=> note.id== id);
//       if(note){
//       res.json(note)
//       }
//       else{
//           res.status(404).send("not found!")
//       }
//   })
// app.delete('/delete/:id', (req,res)=>{
//     const id = req.params.id;
//     notes= notes.filter(note=>note.id!=id)
//     res.send('file deleted')
// })
// app.use('/', (req,res)=>{
//     res.json(notes)
// })
