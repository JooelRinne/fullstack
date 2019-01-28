import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <div>
           <h1>{props.course}</h1>
        </div>
    )
}

const Content = (parts) => {
    return (
        <div>
            <Part part={parts.parts[0].name} exercises={parts.parts[0].exercises} />
            <Part part={parts.parts[1].name} exercises={parts.parts[1].exercises} />
            <Part part={parts.parts[2].name} exercises={parts.parts[2].exercises} />
        </div>    
    )
}

const Total = (parts) => {

    return (
        <div>
            <p>yhteensä {parts.parts[0].exercises + parts.parts[1].exercises + parts.parts[2].exercises} tehtävää</p>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.part} {props.exercises}</p>
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
                name: 'Reactin perusteet',
                exercises: 10
            },
            {
                name: 'Tiedonvälitys propseilla',
                exercises: 7
            },
            {
                name: 'Komponenttien tila',
                exercises: 14
            }
        ]
    }
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
