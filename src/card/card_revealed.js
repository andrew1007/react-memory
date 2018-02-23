import React from 'react'

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  minHeight: '90px',
  borderRadius: '9px',
  position: 'relative'
}

const iconContainerStyle = {
  verticalAlign: 'top'
}

const valueStyle = {
  display: 'flex',
  fontSize: '50px',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  width: '100%'
}

const imageStyle = {
  maxWidth: '35px',
  maxHeight: '35px'
}


const CardRevealed = props => {
  const {icon, value} = props
  const value2LengthStyle = {
    ...valueStyle,
    marginLeft: '-7px'
  }
  return (
    <div style={containerStyle}>
      <div style={iconContainerStyle}>
        <img style={imageStyle} src={icon} alt=''/>
      </div>
      <div style={valueStyle}>
        <div style={{marginTop: '30px'}}>{value}</div>
      </div>
    </div>
  )
}

export default CardRevealed
