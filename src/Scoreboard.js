import * as React from 'react'
import styles from './Scoreboard.module.css';

export default function Scoreboard() {
  const [player1Score, setPlayer1Score] = React.useState(301)
  const [player2Score, setPlayer2Score] = React.useState(301)
  const [player1ScoreList, setPlayer1ScoreList] = React.useState([])
  const [player2ScoreList, setPlayer2ScoreList] = React.useState([])
  const [turn, setTurn] = React.useState('player1')
  const [scoreInputPlaceholder, setScoreInputPlaceholder] = React.useState('Player1 score')
  const [scoreInputValue, setScoreInputValue] = React.useState('')

  const playerScores = player1ScoreList.map((score, index) => {
    return (
      <tr key={`scoreRow-${index}`}>
        <td>{index + 1}</td>
        <td>{score}</td>
        <td>{player2ScoreList[index]}</td>
      </tr>
    )
  })

  let scoreTable;
  if (player1ScoreList.length > 0) {
    scoreTable = (
      <table className={styles.scoresTable}>
        <thead>
          <tr><td>#</td><td>Player1 score</td><td>Player2 score</td></tr>
        </thead>
        <tbody>
          {playerScores}
        </tbody>
      </table>
    )
  }

  const numberButtonClick = (value) => {
    setScoreInputValue(`${scoreInputValue}${value}`)
  }

  const numberButtons = [[1,2,3,4,5],[6,7,8,9,0]].map((group, index) => {
    const buttonGroup = group.map((value) => {
      return (
        <button
          className={styles.numberButton}
          data-e2e={`numberButton${value}`}
          key={`numberButton-${value}`}
          onClick={numberButtonClick.bind(this, value)}>
          {value}
        </button>
      )
    })

    return (
      <div className={styles.buttonGroup} key={`numberGroup-${index}`}>
        {buttonGroup}
      </div>
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
    setScoreInputPlaceholder('Player1 score')
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
        setScoreInputPlaceholder('Player2 score')
        setPlayer1Score(player1Score - score)
        break
      case 'player2':
        player2ScoreList.push(score)
        setPlayer2ScoreList(player2ScoreList)
        setTurn('player1')
        setScoreInputPlaceholder('Player1 score')
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
    <div className={styles.scoreboard}>
      <div className={styles.gameMenu}>
        <button className={styles.resetButton} data-e2e="resetButton" onClick={reset}>&#x21bb;</button>
      </div>
      <div className={styles.score}>
        <span className={styles.player1Score} data-e2e="player1Score">{player1Score}</span>
        <span className={styles.scoreSeparator}>-</span>
        <span className={styles.player2Score} data-e2e="player2Score">{player2Score}</span>
      </div>
      <div className={styles.scoreInput}>
        <input
          type="text"
          className={styles.scoreInputValue}
          data-e2e="scoreInputValue"
          onKeyDown={setScore}
          value={scoreInputValue}
          onChange={updateScore}
          placeholder={scoreInputPlaceholder}
        />
        <button className={styles.removeButton} data-e2e="removeButton" onClick={removeButtonClick}>&larr;</button>
      </div>
      {numberButtons}
      <div className={styles.buttonGroup}>
        <button
          className={styles.enterButton}
          data-e2e="enterButton"
          onClick={enterButtonClick}> &#9166;</button>
      </div>
      {scoreTable}
      <footer className={styles.footer}>
        <a href="https://github.com/stsh89/darts-scoreboard" className={styles.link}>Source code</a>
      </footer>
    </div>
  )
}
