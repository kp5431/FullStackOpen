import React, { useState, useEffect } from 'react'
import Person from './components/Person.js'
import PersonForm from './components/PersonForm.js'
import FilterForm from './components/FilterForm.js'
import personService from "./services/persons"
import OpNote from './components/OpNote.js'

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
  This piece of state contains the text currently displayed in the
  operation notification component
  */
  const [opText, setOpText] = useState(null)

  /*
  This effect is run once, after the first render, because the second arg is an empty list
  Its purpose is to fetch the initial state of the phonebook's data. This data is stored
  in a db.json file locally. Using json-server to make the database server implementation
  */
  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
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
    const personObject = { //create a new person object to add
      name: newName,
      number: newNum
    }
    if(persons.some(person => person.name === newName)){ //person already exists in server
      if(window.confirm(`${newName} is already added to phonebook, would you like to replace their number?`)){
        personService
        .update(persons.find(person => person.name === newName).id, personObject) //get the id of the person object to be changed from the database
        .then(returnedPerson => { //here we update our local frontend state
          setPersons(persons.map(person => { 
            return person.name === newName ? returnedPerson : person //keep the old versions of people unless it's the one we just changed, so use the new version in local state
          })) //note the return in the above line. fails to compile without it
        })
        .catch(error => { //handler for rare case that person is removed while attempting to update
          setPersons(persons.filter(person => person.name !== newName)) //remove the local cached version of the person
          setOpText(`Error: The person ${newName} has already been removed from the server, cannot change their number.`)
          setTimeout(() => {
            setOpText(null)
          }, 5000)
        })
        //update the operation notification text for 5 sec for successful update number change
        setOpText(`${newName}'s number is now set to ${newNum}`)
        setTimeout(() => {
          setOpText(null)
        }, 5000)
      }      
    }
    else{//send the new person object to the server
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson)) //have to add the new person to our local state
        setNewName('')
        setNewNum('')
      })
      //update the operation notification text for 5 sec
      setOpText(`${newName} added to the phonebook!`)
      setTimeout(() => {
        setOpText(null)
      }, 5000)
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

  /*
  this function tells the backend to remove
  a person object
  */
  const handleDeletion = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if(window.confirm(`Are you sure you want to remove ${personToDelete.name}?`)){
      personService
      .del(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        alert(`the person '${personToDelete.name} was already removed from the server'`)
        console.log(error)
      })
    }
  }

  return (
    <div>
      <OpNote msg={opText}/>
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
          <Person key={person.name} content={person} clickHandler={() => handleDeletion(person.id)}/>  //generate a specific handler for each button
          )} {/* generate a list of people in the html of the page */}
      </ul>
    </div>
  )
}

export default App