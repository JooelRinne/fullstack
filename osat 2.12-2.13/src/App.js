import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      capital: {country.capital}
      <br></br>
      population: {country.population}
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt={country.name} width="auto" height="300" />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const handleClick = country => {
    setNewSearch(country.name)
  }

  const countrySearch = () => {
    if (newSearch === '') {
      return countries
    } else {
      return countries.filter(country => country.name.toLowerCase().includes(newSearch.toLowerCase()))
    }
  }

  const rows = () => {
    const countries = countrySearch()
    if (countries.length === 1) {
      return <Country country={countries[0]} />
    } else if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else {
      return (
        countries.map(country => <li key={country.name}>{country.name}<button onClick={() => handleClick(country)}>show</button></li>)
      )
    }

  }

  return (
    <div>
      find counties
    <input
        value={newSearch}
        onChange={handleSearchChange}
      />
      {rows()}
    </div>
  )
}

export default App
