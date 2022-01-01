const mongoose = require('mongoose');
const Contact = require('./models/contact-book');
const credentials = require('./credentials.js');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

const dbURI = `mongodb+srv://${credentials.username}:${credentials.password}@cluster0.91q38.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log("connected"))
    .catch(err => console.log(err));


function add(contact) {
    const contact = new Contact({
        fullName: 'Samuel',
        address: '2 Edenbridge Close',
        postcode: 'BR5 3SL'
    })

    contact.save()
        .then(result => {
            console.log("succesfully saved: ", result)
        })
        .catch(err => {
            console.log(err);
        });
}

function startConsole(params) {
    
}

