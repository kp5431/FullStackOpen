const OpNote = ({msg}) => {
    if(msg === null){
        return null
    }
    return (
        <div className='notification'>
            {msg}
        </div>
    )
  }
  
  export default OpNote