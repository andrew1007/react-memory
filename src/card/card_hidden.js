import React from 'react'
import logo from '../logo.svg'

const containerStyle = {
  minHeight: '104px',
  minWidth: '80px',
  backgroundColor: '#5d7bc2',
  verticalAlign: 'middle',
  borderRadius: '9px',
  padding: '0px',
  display: 'flex',
  alignItems: 'center'
}

const imageStyle = {
  maxHeight: '80px',
  maxWidth: '80px'
}

const CardHidden = props => {
  return (
    <div style={containerStyle}>
      <img style={imageStyle} src={logo} alt={''}/>
    </div>
  )
}

export default CardHidden
