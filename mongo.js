const mongoose = require('mongoose');
const Contact = require('./models/contact-book');
const credentials = require('./credentials.js');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const dbURI = `mongodb+srv://${credentials.username}:${credentials.password}@cluster0.91q38.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

function connect() {

    return new Promise((resolve, reject) => {
        mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log("connected");
                resolve();
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    })
}

function disconnect() {
    mongoose.disconnect();
}


function add(address) {
    connect()
        .then(() => {

            const contact = new Contact(address)

            contact.save()
                .then(result => {
                    console.log("succesfully saved: ", result)
                    disconnect();
                })
                .catch(err => {
                    console.log(err);
                });

        })
}

module.exports.add = add

