const PersonForm = ({formHandler, perChange, numChange, nameState, numState}) => {
    return (
      <form onSubmit={formHandler}>
          <div>
            <ul>
              <li>
                name: <input
                value={nameState}
                onChange={perChange} //each time a char is added to textbox onChange is called
                />
              </li>
              <li>
                number: <input
                  value={numState}
                  onChange={numChange} //each time a char is added to textbox onChange is called
                />
              </li>
            </ul>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }

export default PersonForm