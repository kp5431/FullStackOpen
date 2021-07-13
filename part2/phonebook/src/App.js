import React, { useState } from 'react'

const Person = ({content}) => {
  return (
    <li>{content.name} {content.number}</li>
  )
}


const App = () => {
  /*
  This piece of state contains the array of person objects
  */
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567' }
  ])

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
  This function is called when the button is clicked.
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
      setPersons(persons.concat(personObject)) //must always create new collections/things in react
    }
    else{
      window.alert(`${newName} is already added to phonebook`)
    }
    setNewName('') //reset the text in the form box to blank
    setNewNum('')
  }

  /*
  This function is called each time a char is added in the name textbox.
  It sets the state variable newName to whatever is currently in the
  textbox.
  */
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  /*
  This function is called each time a char is added in the num textbox.
  It sets the state variable newName to whatever is currently in the
  textbox.
  */
  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addBoth}>
        <div>
          <ul>
            <li>
              name: <input
              value={newName}
              onChange={handlePersonChange} //each time a char is added to textbox onChange is called
              />
            </li>
            <li>
              number: <input
                value={newNum}
                onChange={handleNumChange} //each time a char is added to textbox onChange is called
              />
            </li>
          </ul>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.name} content={person}/>
          )}
      </ul>
      <div>debug: {newName}</div>
    </div>
    
  )
}

export default App