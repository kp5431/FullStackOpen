const Person = ({content, clickHandler}) => {
    return (
      <li>
        <p>{content.name} {content.number} <button onClick={clickHandler}>delete</button></p>
      </li>
    )
  }

export default Person