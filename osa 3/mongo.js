const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Anna salasana paremetrina')
  process.exit(1)
}

if (process.argv.length === 4) {
  console.log('Väärä määrä parametreja. Anna komento muodossa "node mongo.js salasana nimi numero" lisätäksesi henkilön tai "node mongo.js salasana" nähdäksesi tietokannassa olevat numerotiedot.')
  process.exit(1)
}

if (process.argv.length > 5) {
  console.log('Väärä määrä parametreja. Anna komento muodossa: "node mongo.js salasana nimi numero" lisätäksesi henkilön tai "node mongo.js salasana" nähdäksesi tietokannassa olevat numerotiedot.')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb://fullstack:${password}@ds125945.mlab.com:25945/fullstack_osa3`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(response => {
    console.log(`lisätään ${name} numero ${number} luetteloon`)
    mongoose.connection.close()
  })

}

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('puhelinluettelo:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

