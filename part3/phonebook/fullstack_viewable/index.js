require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan') //middleware
const Person = require('./models/person')
const { response } = require('express')

//morgan custom token for POST handling
morgan.token("POST", (req, resp) => {
    if(req.method === 'POST'){
        return JSON.stringify(req.body)
    }
    return ""
})


const errorHandler = (error, request, response, next) => { 
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

    
const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :POST'))
app.use(express.static('build'))

/*
* Below are route handlers
*/

app.get('/info', (request, response) => {
    response.send(
    `<div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${Date()}</p>
    </div`)
})

app.get('/api/persons', (request, response) => {
    Person.find({})
    .then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (req, resp) => {
    Person.findById(request.params.id)
    .then(person => {
        response.json(person)
    })
    .catch(err => resp.status(404).end())
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error)) //send the error to be handled in the next middleware
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if(!body.name || !body.number){
        return response.status(400).json({error: 'name OR number missing from new person'})
    }
    const newPerson = new Person({
        name: body.name,
        number: body.number
    })
    newPerson.save()
    .then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(err => response.status(400).json(`Error: ${err}`))
})

app.use(unknownEndpoint) //instead of setting this up before the routes,
                         //this acts as a handler for unknown routes
app.use(errorHandler)


const PORT = process.env.PORT || 5001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)