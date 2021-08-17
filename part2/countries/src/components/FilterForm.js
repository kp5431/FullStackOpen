/***
 * This component returns a textbox (form?) that's setup
 * with a particular string value and handler for when that
 * string changes (user input)
 ***/
const FilterForm = ({str, handler}) => {
    return (<input 
      value={str}
      onChange={handler}
    />
    )
  }
export default FilterForm  