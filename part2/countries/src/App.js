/***
 * This application gives a searchbox to find info on countries.
 * It lists countries with the searchStr in their name, then gives 
 * the user the option to show a more detailed view.
 * Data collected from https://restcountries.eu/
 ***/
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterForm from './components/FilterForm.js'
import BottomOfPage from './components/BottomOfPage.js'


const App = () => {
  
  /*
  This piece of state contains the current text in the search box
  Default is no text
  */
  const [searchStr, setSearchStr] = useState('')

  /*
  This piece of state contains the entire country data from the api.
  */
  const [allCountryData, setAllCountryData] = useState([])

  /*
  This piece of state containes an array of names of countries that have
  their detailed view shown
  */
 const [detailedCountries, setDetailedCountries] = useState([])

  /*
  This effect hook is called once at the first render.
  It queries for data from https://restcountries.eu/. The
  data returned is then stored in the allCountryData state var, 
  which is then not further modified
  */
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(resp => {
        setAllCountryData(resp.data)
      })
  }, [])

  /*
  This event handler is called each time a char is added in the search textbox.
  It sets the state variable searchStr to whatever is currently in the 
  textbox.
  It also resets the detailedCountries array
  */
  const handleSearchChange = (event) => {
    event.preventDefault()
    setDetailedCountries([]) //countries appearing changes, so reset to empty array
    setSearchStr(event.target.value)
  }

  /*
  This event handler is called each time one of the country buttons is clicked.
  It adds/removes the name of the country to the detailedCountries state
  */
  const showButtonHandler = (buttonClicked) => {
    buttonClicked.preventDefault() //prevent default form action
    const thisCountryName = buttonClicked.target.attributes.country.value //we give the button a 'country' attribute in ComplexBullet to uniquely identify it
    if(detailedCountries.includes(thisCountryName)){ //if the detailed view button already pressed, then remove it from the detailedCountries state
      const newStateArray = detailedCountries.filter(name => name !== thisCountryName) //replace with new array
      setDetailedCountries(newStateArray)
    }
    else{
      setDetailedCountries(detailedCountries.concat(thisCountryName)) //otherwise, add the newly pressed button to the detailedCountries state array
    }
  }

  return (
    <div>
      <form>
        find countries: 
          <FilterForm str={searchStr} handler={handleSearchChange} /> {/*Form lets you filter for countries*/}
      </form>
      <BottomOfPage countries={allCountryData} searchStr={searchStr} 
        buttonHandler={showButtonHandler} detailedCountries={detailedCountries}/>
    </div>
  )
}
export default App