const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}
console.log(process.argv)
const password = process.argv[2]

const url = `mongodb+srv://fullstack_test:${password}@cluster0.se9cb.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({ //what the note document should look like
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema) // `constructor-function`, gives the actual note instances the functions required for storing in db, etc

// const note = new Note({ //create an instance
//     content: 'Html is Easy 3',
//     date: new Date(),
//     important: false
// })

// note.save().then(result => {
//     console.log('saved')
// })

Note.find({important: false}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})