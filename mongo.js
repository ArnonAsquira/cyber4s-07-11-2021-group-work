const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DATABASE).then(console.log('DB Connected..')) //connect to Mongo using enviroment param
const PhoneBookSchema = new mongoose.Schema({ //create schema for data
    identifier: String,
    name: String,
    number:{
        type : String,
        unique: true
    }
  })

PhoneBookSchema.set('toJSON',{ //remove returning unnecessary info
transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.id
    delete returnedObject.__v
}
})
module.exports = mongoose.model('PhoneBook', PhoneBookSchema)

//used for the exercise 3.12
// const params = process.argv;
// if(params[2]){
//     const contact = new PhoneBook({
//         name: params[2],
//         number: params[3]
//     })
//     contact.save().then(result=>{
//         console.log(`added ${params[2]}, Number: ${params[3]} to the PhoneBook`);
//         mongoose.connection.close();
//     })
// }
// else{
//     PhoneBook.find({}).then(result => {
//             console.log(result)
//             mongoose.connection.close()
//      })
// }