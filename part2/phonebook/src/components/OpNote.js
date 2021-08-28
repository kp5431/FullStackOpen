const OpNote = ({msg}) => {
    if(msg === null){
        return null
    }
    return (
        <div class='notification'>
            {msg}
        </div>
    )
  }
  
  export default OpNote