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
      <Header text = "statistics"/>
      <Feedback text = "good" num = {good}/>
      <Feedback text = "neutral" num = {neutral}/>
      <Feedback text = "bad" num = {bad}/>
      <Feedback text = "all" num = {good + neutral + bad}/>
      <Feedback text = "average" num = {(good - bad) / (good + bad + neutral)}/>
      <Feedback text = "positive" num = {((good) / (good + bad + neutral)) * 100}/>
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

const Feedback = ({text, num}) => {

  return(
    <div>
      {text} {num}
    </div>
  )
}


export default App