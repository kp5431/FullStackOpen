const express = require('express')
const morgan = require('morgan') //middleware

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

//morgan custom token for POST handling
morgan.token("POST", (req, resp) => {
    if(req.method === 'POST'){
        return JSON.stringify(req.body)
    }
    return ""
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
    
const app = express()
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :POST'))

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(
    `<div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${Date()}</p>
    </div`)
})

app.get('/api/persons/:id', (req, resp) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        resp.json(person)
    }
    else{
        resp.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if(!body.name || !body.number){
        return response.status(400).json({error: 'name OR number missing from new person'})
    }
    if(persons.map(person => person.name).includes(body.name)){
        response.status(400).json({error: `${body.name} already in phonebook`})
    }
    else{
        const newPerson = {
            id: Math.random(0, 999),
            name: body.name,
            number: body.number
            
        }
        persons = persons.concat(newPerson)
        response.json(newPerson)
    }
})

app.use(unknownEndpoint) //instead of setting this up before the routes,
                         //this acts as a handler for unknown routes


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)