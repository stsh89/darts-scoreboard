import * as React from 'react'

export default function Scoreboard() {
  const [player1Score, setPlayer1Score] = React.useState(301)
  const [player2Score, setPlayer2Score] = React.useState(301)
  const [player1ScoreList, setPlayer1ScoreList] = React.useState([])
  const [player2ScoreList, setPlayer2ScoreList] = React.useState([])
  const [turn, setTurn] = React.useState('player1')
  const [scoreInputLabel, setScoreInputLabel] = React.useState('Player1')
  const [scoreInputValue, setScoreInputValue] = React.useState('')

  const numberButtonClick = (value) => {
    setScoreInputValue(`${scoreInputValue}${value}`)
  }

  const numberButtons = [1,2,3,4,5,6,7,8,9,0].map((value) => {
    return (
      <button
        className="button button--number"
        key={`numberButton-${value}`}
        onClick={numberButtonClick.bind(this, value)}>
        {value}
      </button>
    )
  })

  const removeButtonClick = () => {
    setScoreInputValue(scoreInputValue.substring(0, scoreInputValue.length - 1))
  }

  const enterButtonClick = () => {
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
      <div className="game-menu">
        <button className="button button--reset" onClick={reset}>Reset</button>
      </div>
      <div className="score">
        <span className="score__player1">{player1Score}</span>
        <span>:</span>
        <span className="score__player2">{player2Score}</span>
      </div>
      <div className="score-input">
        <label htmlFor="scoreInput" className="score-input__label">{scoreInputLabel}</label>
        <input
          id="scoreInput"
          type="text"
          className="score-input__value"
          onKeyDown={setScore}
          value={scoreInputValue}
          onChange={updateScore}
          autoFocus="on"
        />
      </div>
      <div className="button-groups">
        <div className="number-buttons-group">{numberButtons}</div>
        <div className="control-buttons-group">
          <button className="button button--remove" onClick={removeButtonClick}>Remove</button>
          <button className="button button--enter" onClick={enterButtonClick}>Enter</button>
        </div>
      </div>
    </div>
  )
}
