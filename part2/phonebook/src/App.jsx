import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import axios from 'axios'
import personService from './services/personsService'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => console.log("Fetching people failed"))

  }, [])

  const addName = (event) => {
    event.preventDefault()
    const newContact= {
      name: newName,
      number: newNumber,
    }

    if (!persons.some((person) => person.name === newName)) {
      // la persona no existe
      personService.create(newContact)
        .then(personReturned => {
          setPersons(persons.concat(personReturned))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => console.log(`Create person ${newContact.name} failed`))
      return;
    }
    
    if (!window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
      // el usuario no quiere cambiar el numero
      return;
    }
    
    // actualizacion del numero
    const changedPerson = {...persons.find(person => person.name === newName), number: newNumber}  
    const personsUpdate = persons.map(person =>
      person.name !== newName 
        ? person 
        : changedPerson
    )
    
    setPersons(personsUpdate)  
    setNewName('')
    setNewNumber('')
    personService.update(changedPerson.id, changedPerson).catch(error => console.log(`Update person ${changedPerson.name} failed`))
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

  const handleDeleteOf = (personId) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === personId).name}?`)) {
      personService.deletePerson(personId)
      .then(response => { 
        setPersons(persons.filter(person => person.id !== personId))
      })
      .catch(error => console.log(`Person couldn't be deleted`))
    }  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <h3>add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addName={addName}/>

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDeleteOf}/>
    </div>
  )
}

export default App
