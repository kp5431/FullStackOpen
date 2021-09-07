const FilterForm = ({str, handler}) => {
    return (<input 
      value={str}
      onChange={handler}
    />
    )
  }
export default FilterForm  