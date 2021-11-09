const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://Arnon-Asquira:${password}@cluster0.sihgr.mongodb.net/arnonsfirstdatabase?retryWrites=true&w=majority`;

mongoose.connect(url);

const phoneEntrySchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Entry = mongoose.model('Entry', phoneEntrySchema);

if (process.argv.length >= 5) {
    const entry = new Entry({
        name: process.argv[3],
        number: process.argv[4],
     })
     entry.save().then(result => {
       console.log(`added ${entry.name} number ${entry.number} to phone book`)
       mongoose.connection.close();
     })
     .catch(error => console.log(error))
} else {
    Entry.find({})
    .then(result => {
        console.log(...result);
        mongoose.connection.close();
    })
    .catch(error => {
        console.log(error);
    })
}