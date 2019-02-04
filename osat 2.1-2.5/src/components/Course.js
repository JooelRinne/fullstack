import React from 'react'

const Header = props =>
    <h1>{props.course.name}</h1>

const Total = ({ parts }) => {
    const total = parts.reduce( (total, exercises) => {
        return total + exercises.exercises;
    },0)

    return <p>yhteensä {total} tehtävää</p>
}
  

const Part = props =>
    <p>{props.part.name} {props.part.exercises}</p>

const Content = ({ parts }) => (
    <div>
        {parts.map(part => <Part key={part.id} part={part}/>)}
    </div>
)

const Course = props => (
    <div>
        <Header course={props.course}/>
        <Content parts={props.course.parts}/>
        <Total parts={props.course.parts}/>
    </div>
)

export default Course