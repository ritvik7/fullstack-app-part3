require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
morgan.token('reqBody', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqBody'))

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(result => res.json(result))
    .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
  let date = new Date()
  Person.countDocuments()
    .then(result => res.send(`<div>Phonebook has info of ${result} person(s)</div><br><div>${date}</div>`))
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(foundPerson => {
      if(foundPerson) {
        res.json(foundPerson)
      } else {
        throw new Error('PersonNotFound')
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      if(!result) {
        throw new Error('Person not found')
      }
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const person = req.body
  const personObject = new Person({
    name: person.name,
    number: person.number
  })
  personObject.save()
    .then(savedPerson => res.json(savedPerson))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const person = req.body
  if (!person.number || !person.name)
    return res.status(400).json('Name or number missing')
  Person.findByIdAndUpdate(req.params.id, { number: person.number }, { new: true, runValidators: true })
    .then(updatedPerson => {
      if (!updatedPerson) {
        throw new Error('PersonNotFound')
      }
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.log(error)
  if (error.name === 'CastError') {
    return res.status(400).send('Malformatted id')
  } else if (error.name === 'ValidationError') {
    return res.status(400).send(error.message)
  } else if (error.message === 'Person not found') {
    return res.status(404).send(error.message)
  }
  next(error)
}

app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`app running on ${PORT}`))