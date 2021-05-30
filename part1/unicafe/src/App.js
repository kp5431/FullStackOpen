import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text = "give feedback"/>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Statistics good = {good} neutral = {neutral} bad = {bad}/> 
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (!(good + neutral + bad)){
    return (
      <div>
        <Header text = "statistics"/>
        <p> No feedback given </p>
      </div>
    )
  }
  const all = good + bad + neutral
  const average = (good - bad) / (good + bad + neutral)
  const positive = ((good) / (good + bad + neutral)) * 100
  return (
    <div>
      <Header text = "statistics"/>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>  
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>  
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>  
          </tr>
          <tr>
            <td>all</td>
            <td>{all}</td>  
          </tr>
          <tr>
            <td>average</td>
            <td>{average}</td>  
          </tr>
          <tr>
            <td>positive</td>
            <td>{positive} %</td>  
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  //console.log('props value is', props)
  return (
    <button onClick = {handleClick}>
      {text}
    </button>
  )
}

const Header = ({text}) => {
  return(
    <div>
      <h1>{text}</h1>
    </div>
  )
}


export default App