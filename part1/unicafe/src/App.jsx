import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      
      <Button onSmash={handleGoodClick} text="good"/>
      <Button onSmash={handleNeutralClick} text="neutral"/>
      <Button onSmash={handleBadClick} text="bad"/>

      <Statistics good={good} bad={bad} neutral={neutral}/>
      
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onSmash}>{props.text}</button>
  )
}


const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  const calculateAverage = () => {
    let sum = good * 1 + 0 * neutral + bad * (-1);
    let total = good + neutral + bad;

    return sum/total;
  }

  const calculatePossitivePercentage = () => {
    let total = good + neutral + bad;
    return good * 100 / total;
  }

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        No feedback given
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>Statistics</h1>

        <table>
          <tbody>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="all" value={good + neutral + bad}/>
            <StatisticLine text="average" value={calculateAverage()}/>
            <StatisticLine text="positive" value={calculatePossitivePercentage() + " %"}/>
          </tbody>
        </table>
        
      </div>
    )
  }
}


export default App