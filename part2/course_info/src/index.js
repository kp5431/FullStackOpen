import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}

const Total = ({array}) => {
  let sum = 0
  for(let i = 0; i < array.length; i++){
    sum += array[i].exercises
  }
  return(
    <h3>Number of exercises {sum}</h3>
  ) 
}
/*
const Part = ({name, exercises}) => {
  return (
    <li>
      {name} {exercises}
    </li>    
  )
}
*/
const Content = ({parts}) => {
  return (
    <div>
      <ul>
        {parts.map(part =>
          <li key={part.id}> 
            {part.name} {part.exercises}
          </li>
          )}
      </ul>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts} />
      <Total array={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))