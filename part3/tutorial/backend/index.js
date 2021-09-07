const express = require('express')
const cors = require('cors') //use cors to get past same origin policy

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
  ]

const requestLogger = (request, response, next) => { //middleware
console.log('Method:', request.method)
console.log('Path:  ', request.path)
console.log('Body:  ', request.body)
console.log('---')
next()
}

const genId = () => {
    const maxId = notes.length > 0 
    ? Math.max(...notes.map(n => n.id)) //three dot spread syntax converts the array into individual numbers
    : 0
    return maxId + 1
}
const app = express()
app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if(note){
        response.json(note)
    }
    else{
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.put('/api/notes/:id', (req, resp) => {
    if(!req.body.content){
        return resp.status(400).json({error: 'content missing'}) //400 bad request
    }
    const id = Number(req.params.id)
    notes = notes.map(note => note.id === id ? req.body : note)
    resp.json(req.body)
})

app.post('/api/notes', (request, response) => {
    
    const body = request.body //body property would be undefined without json-parser
    
    if(!body.content){
        return response.status(400).json({error: 'content missing'}) //400 bad request
    }

    const newNote = {
        content: body.content,
        important: body.important || false, //if important is undefined then default to false
        date: new Date(),
        id: genId(),
    }

    notes = notes.concat(newNote)
    response.json(newNote)
})


const PORT = process.env.port || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
