import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const newContact= {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }


    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(newContact))
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = filter === '' 
    ? persons 
    : persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <h3>add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addName={addName}/>

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App
