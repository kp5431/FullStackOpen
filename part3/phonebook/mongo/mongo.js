const mongoose = require('mongoose')

/**
 * This function connects to the db 
 **/
const connectToDb = (args) => {
    const password = args[2]
    const dbName = 'phonebookDB'
    const url = `mongodb+srv://fullstack_test:${password}@cluster0.se9cb.mongodb.net/${dbName}?retryWrites=true&w=majority`
    mongoose.connect(url)
}

/** 
 * This funtion displays all the people in the database 
**/
const displayAll = () => {
    Person.find({}).then(result => {
        if (result.length < 1) {
            console.log("No entries found!")
        }
        else {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
        }
        mongoose.connection.close()
    })
}

/**
 * This function adds a new person to the database
 */
const addPerson = (name, number) => {
    const newPerson = new Person({ //create a new person instance
        name: name,
        number: number
    })

    //use the save() method added by turning the Schema into a Model
    //to save the instance to the db
    newPerson.save().then(result => {
        console.log('saved')
        mongoose.connection.close()
    })
}

//define the schema for a person (schema: how the data is structured)
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

// link the personSchema to a model, which gives the schema various functions 
//to communicate with the db
const Person = mongoose.model('Person', personSchema) 











switch(process.argv.length) {
    case 3:
        console.log('Displaying all phonebook entries...\n')
        connectToDb(process.argv)
        displayAll()
        break
    case 5:
        console.log('Adding new person...\n')
        connectToDb(process.argv)
        const name = process.argv[3]
        const number = process.argv[4]
        addPerson(name, number)
        break
    default:
        console.log(
`Usage:
    node mongo.js <password>
        displays all db entries
    node mongo.js <password> <'name'> <number>
        saves a new person to the db`
        )
        mongoose.connection.close()
        break
}

