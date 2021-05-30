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
  return (
    <div>
      <Header text = "statistics"/>
      <Statistic text = "good" num = {good} displayPercent = {0}/>
      <Statistic text = "neutral" num = {neutral} displayPercent = {0}/>
      <Statistic text = "bad" num = {bad} displayPercent = {0}/>
      <Statistic text = "all" num = {good + neutral + bad} displayPercent = {0}/>
      <Statistic text = "average" num = {(good - bad) / (good + bad + neutral)} displayPercent = {0}/>
      <Statistic text = "positive" num = {((good) / (good + bad + neutral)) * 100} displayPercent = {1}/>
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

const Statistic = ({text, num, displayPercent}) => {
  if(displayPercent){
    return(
      <div>
        {text} {num} %
      </div>
    )  
  }
  return(
    <div>
      {text} {num}
    </div>
  )
}


export default App