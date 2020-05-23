import * as React from 'react'

export default function Scoreboard() {
  const [player1Score, setPlaer1Score] = React.useState(301)
  const [player2Score, setPlaer2Score] = React.useState(301)

  const controls = [1,2,3,4,5,6,7,8,9,0,'enter'].map((value) => {
    return (
      <button key={`control-${value}`}>{value}</button>
    )
  })

  return (
    <div className="scoreboard">
      <button>Reset</button>
      <div className="score">
        <span>{player1Score}</span>
        <span>:</span>
        <span>{player2Score}</span>
      </div>
      <div className="score-inputs">
        <span><input type="number" /></span>
        <span><input type="number" /></span>
      </div>
      <div className="controls">
        {controls}
      </div>
    </div>
  )
}
