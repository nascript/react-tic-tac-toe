import './App.css'
import { useState, useEffect } from 'react'
import Square from './Components/Square'
import { Patterns } from './Patterns'

function App() {
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', ''])
  const [player, setPlayer] = useState('O')
  const [result, setResult] = useState({ winner: 'none', state: 'none' })
  const [countWinnerPlayer1, setCountWinnerPlayer1] = useState(0)
  const [countWinnerPlayer2, setCountWinnerPlayer2] = useState(0)
  const [countTie, setCountTie] = useState(0)

  useEffect(() => {
    checkWin()
    checkIfTie()

    if (player === 'X') {
      setPlayer('O')
    } else {
      setPlayer('X')
    }
  }, [board])

  useEffect(() => {
    if (result.state !== 'none') {
      alert(`Game Finished! Winning Player: ${result.winner}`)
      restartGame()
    }
  }, [result])

  const chooseSquare = (square) => {
    console.log('square', square)
    setBoard(
      board.map((val, idx) => {
        if (idx === square && val === '') {
          return player
        }

        return val
      })
    )
  }

  const setWinerCountPlayer1 = () => {
    localStorage.setItem('player1', countWinnerPlayer1 + 1)
    return setCountWinnerPlayer1(countWinnerPlayer1 + 1)
  }
  const setWinerCountPlayer2 = () => {
    localStorage.setItem('player2', countWinnerPlayer2 + 1)
    return setCountWinnerPlayer2(countWinnerPlayer2 + 1)
  }

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]]
      if (firstPlayer === '') return
      let foundWinningPattern = true
      currPattern.forEach((idx) => {
        if (board[idx] !== firstPlayer) {
          foundWinningPattern = false
        }
      })

      if (foundWinningPattern) {
        setResult({ winner: player, state: 'Won' })
        player === 'X' ? setWinerCountPlayer1() : setWinerCountPlayer2()
      }
    })
  }

  const checkIfTie = () => {
    let filled = true
    board.forEach((square) => {
      if (square === '') {
        filled = false
      }
    })

    if (filled) {
      setResult({ winner: 'No One', state: 'Tie' })
      setCountTie(countTie + 1)
      localStorage.setItem('tie', countTie + 1)
    }
  }

  const restartGame = () => {
    setBoard(['', '', '', '', '', '', '', '', ''])
    setPlayer('O')
  }

  return (
    <>
      <div className='App'>
        <div className='board'>
          <div className='row'>
            <Square
              val={board[0]}
              chooseSquare={() => {
                chooseSquare(0)
              }}
              index={0}
            />

            <Square
              val={board[1]}
              chooseSquare={() => {
                chooseSquare(1)
              }}
              index={1}
            />
            <Square
              val={board[2]}
              chooseSquare={() => {
                chooseSquare(2)
              }}
              index={2}
            />
          </div>
          <div className='row'>
            <Square
              val={board[3]}
              chooseSquare={() => {
                chooseSquare(3)
              }}
              index={3}
            />
            <Square
              val={board[4]}
              chooseSquare={() => {
                chooseSquare(4)
              }}
              index={4}
            />
            <Square
              val={board[5]}
              chooseSquare={() => {
                chooseSquare(5)
              }}
              index={5}
            />
          </div>
          <div className='row'>
            <Square
              val={board[6]}
              chooseSquare={() => {
                chooseSquare(6)
              }}
              index={6}
            />
            <Square
              val={board[7]}
              chooseSquare={() => {
                chooseSquare(7)
              }}
              index={7}
            />
            <Square
              val={board[8]}
              chooseSquare={() => {
                chooseSquare(8)
              }}
              index={8}
            />
          </div>
        </div>
      </div>
      <div className='container-info'>
        <div className='info'>
          <div>
            <p>Player 1 (X)</p>
            <p>{localStorage.getItem('player1')}</p>
          </div>
          <div>
            <p>Tie</p>
            <p>{localStorage.getItem('tie')}</p>
          </div>
          <div>
            <p>Player 2 (X)</p>
            <p>{localStorage.getItem('player2')}</p>
          </div>
          <div className='users'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
              />
            </svg>
            <p>2p</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
