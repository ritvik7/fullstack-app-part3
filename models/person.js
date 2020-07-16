const mongo = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI

mongo
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('Connection success!'))
  .catch(error => console.log(error))

const personSchema = new mongo.Schema({
  name: {
    type: String,
    minlength: [3, 'Name should be longer than 2 letters'],
    required: true,
    unique: true
  },
  number: {
    type: String,
    required: true,
    minlength: [8, 'Phone number should be 8 digits long'],
  }
})

personSchema.plugin(uniqueValidator, { message: '{VALUE} already exists' })

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongo.model('Person', personSchema)
