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
  This effect hook is called once at the first render.
  It queries for data from https://restcountries.eu/. The
  data returned is then stored in the allCountryData state var, 
  then is not further modified
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
  */
  const handleSearchChange = (event) => {
    setSearchStr(event.target.value)
  }

  return (
    <div>
      <form>
        find countries: 
          <FilterForm str={searchStr} handler={handleSearchChange} /> {/*Form lets you filter for countries*/}
      </form>
      <BottomOfPage countries={allCountryData} searchStr={searchStr}/>
    </div>
  )
}
export default App