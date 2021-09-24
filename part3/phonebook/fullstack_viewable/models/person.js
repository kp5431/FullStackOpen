const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator') //only unique vals marked as unique allowed in db
const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error while connecting to MongoDB:', error.message)
    })

//define the schema for a person (schema: how the data is structured)
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    number: {
        type: String,
        minlength: 8,
        required: true
    }
})
personSchema.plugin(uniqueValidator); //apply

personSchema.set('toJSON', { //the server cleans up the data it forwards to the frontend
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
