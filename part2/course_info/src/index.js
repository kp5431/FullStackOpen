import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}

const Total = ({array}) => {
  //how this works:
  //iter 1: a = 0, c = 10
  //iter 2: a = 10, c = 7
  //iter 3: a = 17, c = 14
  //iter 4: a = 31, c = 11
  //iter 5: a = 42
  //accum is an integer every time, but have to hardcode the initial '0' val in as second arg.
  //then add obj.exercises each iter (currVal.exercises)
  const sum = array.reduce((accum, currVal) => {
    return accum + currVal.exercises
  }, 0)
  return(
    <h3>total of {sum} exercises</h3>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
/*
{parts.map(part =>
          <li key={part.id}> 
            {part.name} {part.exercises}
          </li>
          )}
*/
  return (
    <div>
      <ul>
        {courses.map(course =>
         <Course key={course.id} course={course} />
          )}
      </ul>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))