const mongoose = require('mongoose')
require('dotenv').config()


//mongoose addition
mongoose.connect(process.env.DATABASE).then(console.log('DB Connected..'))
const noteSchema = new mongoose.Schema({
    content:{
        type  : String,
        unique : true
    },
  date: Date,
  important: Boolean,
})
noteSchema.set('toJSON',{
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Note', noteSchema)