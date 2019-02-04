import React from 'react'

const Filter = ({ handleSearchChange, newSearch }) => {
    return (
        <div>
            rajaa näytettäviä
            <input
                value={newSearch}
                onChange={handleSearchChange}
            />
        </div>
    )
}

export default Filter

