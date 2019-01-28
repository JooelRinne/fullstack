import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Average = (props) => {
    return (
        <tr>
            <td>keskiarvo</td> 
            <td>{(props.good * 1 + props.bad * -1) / props.total}</td>
        </tr>
    )
}

const Positive = (props) => {
    return (
        <tr>
            <td>positiivisia</td> 
            <td>{props.good/props.total * 100}%</td>
        </tr>
    )
}

const Statistic = (props) => {
    if (props.text === 'keskiarvo') {
        return <Average good={props.good} bad={props.bad} total={props.total}/>
    }

    if (props.text === 'positiivisia') {
        return <Positive good={props.good} total={props.total}/>
    }

    return (
        <tr>
            <td>{props.text}</td> 
            <td>{props.value}</td>
        </tr>
    )
}
    
const Statistics = (props) => {
    const { good, neutral, bad, total } = props
    if (total === 0) {
        return <p>Ei yhtään palautetta annettu</p>
    }

    return (
        <div>
            <h1>statistiikka</h1>
            <table>
                <tbody>
                    <Statistic text='hyvä' value={good} />
                    <Statistic text='neutraali' value={neutral} />
                    <Statistic text='huono' value={bad} />
                    <Statistic text='yhteensä' value={total} />
                    <Statistic text='keskiarvo' good={good} bad={bad} total={total} />
                    <Statistic text='positiivisia' good={good} total={total} />
                </tbody>
            </table>
        </div>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)

    const handleClickGood = () => {
        setGood(good + 1)
        setTotal(total +1)
    }
    
    const handleClickNeutral = () => {
        setNeutral(neutral + 1)
        setTotal(total +1)
    }

    const handleClickBad = () => {
        setBad(bad + 1)
        setTotal(total +1)
    }    

    return (
        <div>
            <h1>anna palautetta</h1>
            <Button handleClick={handleClickGood} text='hyvä' />
            <Button handleClick={handleClickNeutral} text='neutraali' />
            <Button handleClick={handleClickBad} text='huono' />
            <Statistics good={good} neutral={neutral} bad={bad} total={total} />
        </div>
    )
}

ReactDOM.render(<App />, 
     document.getElementById('root')
)