import React from 'react'

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  minHeight: '90px',
  borderRadius: '9px'
}

const iconContainerStyle = {
  verticalAlign: 'top'
}

const valueStyle = {
  display: 'flex',
  alignItems: 'flex-end',
  fontSize: '50px'
}

const imageStyle = {
  maxWidth: '35px',
  maxHeight: '35px'
}

const CardRevealed = props => {
  const {icon, value} = props
  return (
    <div style={containerStyle}>
      <div style={iconContainerStyle}>
        <img style={imageStyle} src={icon} alt=''/>
      </div>
      <div style={valueStyle}>
        {value}
      </div>
    </div>
  )
}

export default CardRevealed