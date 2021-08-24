import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './Person.js'
import PersonForm from './PersonForm.js'
import FilterForm from './FilterForm.js'

/*
* React Phonebook application. Uses state to add new people to phonebook
* and search for people based on name
*/

const App = () => {
  /*
  This piece of state contains the array of person objects
  */
  const [ persons, setPersons ] = useState([])

  /*
  This piece of state contains the current text in the name box
  Default is no text
   */ 
  const [ newName, setNewName ] = useState('')

  /*
  This piece of state contains the current text in the number box
  Default is no text
  */
  const [newNum, setNewNum] = useState('')

  /*
  This piece of state contains the current text in the search box
  Default is no text
  */
  const [searchStr, setSearchStr] = useState('')

  /*
  This effect is run once, after the first render, because the second arg is an empty list
  Its purpose is to fetch the initial state of the phonebook's data. This data is stored
  in a db.json file locally. Using json-server to make the database server implementation
  */
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(resp => {
        setPersons(resp.data)
      })
  }, [])

  /*
  This event handler is called when the button is clicked.
  It adds a new person to the person state variable (list)
  if their name is not already added, then resets the text
  in the form. Also adds number
  */
  const addBoth = (buttonClicked) => {
    buttonClicked.preventDefault() //prevent default form action
    if(!newName.length || !newNum.length){
      window.alert("Please don't enter an empty string")
    }
    else if(!persons.some(person => person.name === newName)){
      const personObject = { //create a new person object to add
        name: newName,
        number: newNum
      }
      //send the new person object to the server
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(resp => {
        setPersons(persons.concat(resp.data)) //must always create new collections/things in react
      })
      
    }
    else{
      window.alert(`${newName} is already added to phonebook`)
    }
    setNewName('') //reset the text in the form box to blank
    setNewNum('')
  }

  /*
  This event handler is called each time a char is added in the name textbox.
  It sets the state variable newName to whatever is currently in the
  textbox.
  */
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  /*
  This event handler is called each time a char is added in the num textbox.
  It sets the state variable newNum to whatever is currently in the
  textbox.
  */
  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  /*
  This event handler is called each time a char is added in the search textbox.
  It sets the state variable searchStr to whatever is currently in the 
  textbox.
  */
  const handleSearchChange = (event) => {
    setSearchStr(event.target.value)
  }

  /*
  this var is updated each time theres a state change. It filters the people to show
  if the searchStr is not empty
  */
  const peopleToShow = searchStr.length
    ? persons.filter(person => person.name.toLowerCase().includes(searchStr.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        show names only containing: 
          <FilterForm str={searchStr} handler={handleSearchChange} /> {/*Form lets you input a string to filter people*/}
      </form>
      <h2>Add a new</h2>
        <PersonForm formHandler={addBoth} perChange={handlePersonChange} 
          numChange={handleNumChange} nameState={newName} numState={newNum}/> {/*Form for adding a new person with their phone number*/} 
      <h2>Numbers</h2>
      <ul>
        {peopleToShow.map(person =>
          <Person key={person.name} content={person}/> 
          )} {/* generate a list of people in the html of the page */}
      </ul>
    </div>
  )
}

export default App