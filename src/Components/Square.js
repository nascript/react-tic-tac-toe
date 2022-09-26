import React from 'react'
import '../App.css'
function Square({ val, chooseSquare, index }) {
  return (
    <>
      <div className='square' onClick={chooseSquare}>
        {val}
      </div>
      {/* {index} */}
    </>
  )
}

export default Square
