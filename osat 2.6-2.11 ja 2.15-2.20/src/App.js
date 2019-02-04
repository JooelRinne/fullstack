import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    let isAlready = false

    persons.forEach(function (item) {
      if (item.name === newName && item.number === newNumber) {
        window.alert(`${newName} on jo luettelossa`)
        isAlready = true
      } else if (item.name === newName && item.number !== newNumber) {
        if (window.confirm(`${item.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
          const person = persons.find(person => person.id === item.id)
          const newPerson = { ...person, number: newNumber }

          personService
            .update(item.id, newPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== item.id ? person : returnedPerson))
              setMessage(
                `Henkiön ${newPerson.name} numero muutettu`
              )
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })
            .catch(error => {
              setErrorMessage(
                `Henkilö ${newPerson.name} oli jo poistettu`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              setPersons(persons.filter(person => person.id !== item.id))
            })
        }
        isAlready = true
      }
    })

    if (!isAlready) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
      setMessage(
        `Lisättiin '${newPerson.name}'`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    }
    setNewName('')
    setNewNumber('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const personSearch = () => {
    if (newSearch === '') {
      return persons
    } else {
      return persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
    }
  }

  const deletePerson = id => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Poistetaanko henkilö ${person.name}?`)) {
      personService
        .erase(id)
        .then(result => {
          setMessage(
            `Poistettiin '${person.name}'`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Henkilö ${person.name} oli jo poistettu`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      setPersons(persons.filter(person => person.id !== id))
    }
  }



  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification className="ok" message={message} />
      <Notification className="error" message={errorMessage} />
      <Filter handleSearchChange={handleSearchChange} newSearch={newSearch} />
      <h3>lisää uusi</h3>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numerot</h2>
      <div>
        <ul>
          {personSearch().map(person =>
            <Persons
              key={person.id}
              person={person}
              deletePerson={() => deletePerson(person.id)}
            />
          )}
        </ul>
      </div>
    </div>
  )
}

export default App
