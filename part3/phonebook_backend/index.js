const { response } = require('express')
const express = require('express')

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
const app = express()
app.use(express.json())


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

app.delete('/api/persons/', (request, response) => {
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
            name: body.name,
            number: body.number,
            id: Math.random(0, 999)
        }
        persons = persons.concat(newPerson)
        response.json(newPerson)
    }
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)