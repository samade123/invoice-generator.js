const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema defines the structure of the models were creating

const contactSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true
  },
}, { timestamps: true }); //auto timestamps our collections

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;