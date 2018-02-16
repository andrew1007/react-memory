import React from 'react'

const containerStyle = {
  fontSize: '40px',
  border: '5px solid black',
  borderRadius: '10px',
  minHeight: '50px'
}

const buttonStyle = {
  backgroundColor: 'transparent',
  border: '2x solid black',
  borderRadius: '10px',
  outline: 'none',
  fontSize: '20px',
}

const resetStyle = {
  ...buttonStyle,
  float: 'left'
}

const showFoundStyle = {
  ...buttonStyle,
  float: 'right'
}

const Message = props => {
  return (
    <div style={containerStyle}>
      <button style={resetStyle} onClick={props.initGame}>
        Reset Game
      </button>
      {props.message}
      <button style={showFoundStyle} onClick={props.handleShowFoundCards}>
        Show found cards
      </button>
    </div>
  )
}

export default Message
