const mongo = require('mongoose')

if(process.argv.length < 3 || process.argv.length === 4) {
  console.log('Please enter the password and/or both name and number')
  process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://ritvikgaur:${password}@cluster0.p1xpf.mongodb.net/phonebook?retryWrites=true&w=majority`
mongo
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connection success!'))
  .catch(error => console.log(error))

const personSchema = new mongo.Schema({
  name: String,
  number: String,
})
const Person = mongo.model('Person', personSchema)

if(process.argv.length === 3) {
  Person.find({}).then(result => {
    result.map(person => console.log(person.name, person.number))
    mongo.connection.close()
  })
} else {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({
    name: name,
    number: number,
    id: 1,
  })
  person.save().then(() => {
    console.log(`Added ${name} number ${number} to phonebook!`)
    mongo.connection.close()
  }).catch(error => console.log(error))
}
