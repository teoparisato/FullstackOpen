import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const votesArray = Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(votesArray)

  const selectAnecdote = () =>  {
    let select = Math.floor(Math.random() * anecdotes.length)
    setSelected(select);
  }

  const voteAnecdote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVotesAnecdote = () => {
    let maxVotes = 0;
    for (let i = 0; i < votes.length; i++) {
      if (votes[maxVotes] < votes[i]) {
        maxVotes = i;
      }
    }
    return maxVotes;
  }

  let mostVotedIndex = mostVotesAnecdote()
  let mostVoted = anecdotes[mostVotedIndex]
  let mostVotes = votes[mostVotedIndex]

  return (
    <div>
      <Title name="Anecdote of the date" />

      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <Button text="vote" onSmash={voteAnecdote}/>
      <Button text="next anecdote" onSmash={selectAnecdote}/>

      <Title name="Anecdote with most votes"/>
      <Anecdote anecdote={mostVoted} votes={mostVotes}/>
    </div>
  )
}

const Title = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  )
}

const Anecdote = (props) => {
  return (
    <>
      {props.anecdote}
      <br />
      has {props.votes} votes
      <br />
    </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onSmash}>{props.text}</button>
  )
}

export default App
