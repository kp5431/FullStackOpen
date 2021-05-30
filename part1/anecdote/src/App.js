import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [maxIndex, setMaxIndex] = useState(0) //sets maxIndex up as a state variable initialized to 0

  const [selected, setSelected] = useState(0) //sets selected up as a state variable initialized to 0
  const getRandomInt = () => Math.floor(Math.random() * anecdotes.length) //returns a random integer within range 0 to length of anecdotes - 1
  const handleAnecdote = () => setSelected(getRandomInt()) //function describes what to do when anecdote button is clicked. It sets selected to the random num

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0)) //sets votes up as a state variable initialized to an array of length anecdotes full of 0's
  const handleVote = () => { //describes what to do when votes button is clicked. 
    const copy = [...votes] //create an identical copy of votes
    copy[selected] += 1 //increase val by 1 at selected index
    setVotes(copy) //sets votes to the new copy array. Can't mutate a datastructure when it's part of a React component's state.
    
    //below finds index for largest num of votes
    let currMax = 0 
    let lMaxIndex = 0 
    let i = 0
    for (i = 0; i < copy.length; i++){
      if(copy[i] > currMax){
        currMax = copy[i]
        lMaxIndex = i
      }
    }
    setMaxIndex(lMaxIndex)
  }



  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]} <br></br>
        has {votes[selected]} votes
      </p>
      <p>
        <Button handleClick = {handleVote} text = "vote"/>
        <Button handleClick = {handleAnecdote} text = "next anecdote"/>
      </p>
      <h1>Anecdote with the most votes</h1>
      <p>
        {anecdotes[maxIndex]} <br></br>
        has {votes[maxIndex]} votes
      </p>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick = {handleClick}>
      {text}
    </button>
  )
}

export default App