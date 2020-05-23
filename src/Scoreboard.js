import * as React from 'react'

export default function Scoreboard() {
  const [player1Score, setPlayer1Score] = React.useState(301)
  const [player2Score, setPlayer2Score] = React.useState(301)
  const [player1ScoreList, setPlayer1ScoreList] = React.useState([])
  const [player2ScoreList, setPlayer2ScoreList] = React.useState([])
  const [turn, setTurn] = React.useState('player1')
  const [scoreInputLabel, setScoreInputLabel] = React.useState('Player1')
  const [scoreInputValue, setScoreInputValue] = React.useState('')

  const numberControlClick = (value) => {
    setScoreInputValue(`${scoreInputValue}${value}`)
  }

  const numberControls = [1,2,3,4,5,6,7,8,9,0].map((value) => {
    return (
      <button key={`control-${value}`} onClick={numberControlClick.bind(this, value)}>{value}</button>
    )
  })

  const removeControlClick = () => {
    setScoreInputValue(scoreInputValue.substring(0, scoreInputValue.length - 1))
  }

  const enterControlClick = () => {
    changeTurnWithGuard()
  }

  const changeTurnWithGuard = () => {
    const score = parseInt(scoreInputValue)

    if (!isNaN(score)) {
      changeTurn(score)
    }
  }

  const reset = () => {
    setPlayer1Score(301)
    setPlayer1ScoreList([])
    setPlayer2Score(301)
    setPlayer2ScoreList([])
    setTurn('player1')
    setScoreInputLabel('Player1')
    setScoreInputValue('')
  }

  const updateScore = (e) => {
    setScoreInputValue(e.target.value)
  }

  const changeTurn = (score) => {
    switch (turn) {
      case 'player1':
        player1ScoreList.push(score)
        setPlayer1ScoreList(player1ScoreList)
        setTurn('player2')
        setScoreInputLabel('Player2')
        setPlayer1Score(player1Score - score)
        break
      case 'player2':
        player2ScoreList.push(score)
        setPlayer2ScoreList(player2ScoreList)
        setTurn('player1')
        setScoreInputLabel('Player1')
        setPlayer2Score(player2Score - score)
        break
    }

    setScoreInputValue('')
  }

  const setScore = (e) => {
    if (e.key === 'Enter') {
      changeTurnWithGuard()
    }
  }

  return (
    <div className="scoreboard">
      <button onClick={reset}>Reset</button>
      <div className="score">
        <span>{player1Score}</span>
        <span>:</span>
        <span>{player2Score}</span>
      </div>
      <div className="score-input">
        <label htmlFor="scoreInput">{scoreInputLabel}</label>
        <input
          id="scoreInput"
          type="number"
          onKeyDown={setScore}
          value={scoreInputValue}
          onChange={updateScore}
        />
      </div>
      <div className="controls">
        {numberControls}
        <button onClick={removeControlClick}>Remove</button>
        <button onClick={enterControlClick}>Enter</button>
      </div>
    </div>
  )
}
