import React, { Fragment } from 'react'

const containerStyle = {
  fontSize: '40px',
  borderRadius: '10px',
  minHeight: '50px',
  width: '80vw',
  display: 'flex',
  justifyContent: 'space-between',
  maxWidth: '1039px'
}

const buttonStyle = {
  backgroundColor: 'transparent',
  border: '2x solid black',
  borderRadius: '10px',
  outline: 'none',
  fontSize: '20px',
  color: 'white',
  minWidth: '150px'
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
      <Fragment>
        {props.message}
      </Fragment>
      <button style={showFoundStyle} onClick={props.handleShowFoundCards}>
        <div>{props.showFoundCards ? 'Hide' : 'Show'} found cards</div>
        <div>Matches Found: {props.matchedCardCount}</div>
      </button>
    </div>
  )
}

export default Message
