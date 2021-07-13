import React, { useState } from 'react'

const Person = ({name}) => {
  return (
    <li>{name}</li>
  )
}


const App = () => {
  /*
  This piece of state contains the array of person objects
  */
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  /*
  This piece of state contains the current text in the form box
  Default is no text
   */ 
  const [ newName, setNewName ] = useState('')

  /*
  This function is called when the button is clicked.
  It adds a new person to the person state variable (list),
  and also resets the text in the form
  */
  const addPerson = (buttonClicked) => {
    buttonClicked.preventDefault() //prevent default form action
    const personObject = { //create a new person object to add
      name: newName
    }
    setPersons(persons.concat(personObject)) //must always create new collections/things in react
    setNewName('') //reset the text in the form box to blank
  }

  /*
  This function is called each time a char is added in the textbox.
  It sets the state variable newName to whatever is currently in the
  textbox.
  */
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
           value={newName}
           onChange={handlePersonChange} //each time a char is added to textbox onChange is called
           />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.name} name={person.name}/>
          )}
      </ul>
      <div>debug: {newName}</div>
    </div>
    
  )
}

export default App