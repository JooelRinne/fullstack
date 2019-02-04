import React from 'react'

const PersonForm = ({ addPerson, newName, handlePersonChange, newNumber, handleNumberChange }) => {
    return (
        <form onSubmit={addPerson}>
        <div>
          nimi: 
          <input 
            value={newName}
            onChange={handlePersonChange}
          />
        </div>
        <div>
          numero:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    )
}

export default PersonForm
