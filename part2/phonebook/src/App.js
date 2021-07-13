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
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
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
  This piece of state contains the current text in the search box
  Default is no text
  */
  const [searchStr, setSearchStr] = useState('')

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
  It sets the state variable newNum to whatever is currently in the
  textbox.
  */
  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  /*
  This function is called each time a char is added in the search textbox.
  It sets the state variable searchStr to whatever is currently in the 
  textbox.
  */
  const handleSearchChange = (event) => {
    setSearchStr(event.target.value)
  }

  const peopleToShow = searchStr.length
    ? persons.filter(person => person.name.toLowerCase().includes(searchStr.toLowerCase()))
    : persons
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        show names only containing <input 
          value={searchStr}
          onChange={handleSearchChange}
        />
        
      </form>
      <h2>Add a new</h2>
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
        {peopleToShow.map(person =>
          <Person key={person.name} content={person}/>
          )}
      </ul>
      <div>debug: {newName}</div>
    </div>
    
  )
}

export default App