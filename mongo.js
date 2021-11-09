
const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.DATABASE).then(console.log('DB Connected..'))
const PhoneBookSchema = new mongoose.Schema({
    name: String,
    number: String
  })
const PhoneBook = mongoose.model('PhoneBook', PhoneBookSchema)
const params = process.argv;
if(params[2]){
    const contact = new PhoneBook({
        name: params[2],
        number: params[3]
    })
    contact.save().then(result=>{
        console.log(`added ${params[2]}, Number: ${params[3]} to the PhoneBook`);
        mongoose.connection.close();
    })
}
else{
    PhoneBook.find({}).then(result => {
            console.log(result)
            mongoose.connection.close()
     })
}