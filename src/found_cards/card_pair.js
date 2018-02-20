import React from 'react'
import Card from '../card/card'

const containerStyle = {
  position: 'relative',
  marginBottom: '50px'
}

const card2Style = {
  position: 'absolute',
  top: '50px'
}

const CardPair = props => {
  const [card1, card2] = props.cards
  const flipped = true
  const disableAll = true
  const matched = false //to make it flipped upright
  const value = card1.value
  const cardProps = {flipped, disableAll, matched, value}
  const card1Props = {...cardProps, icon: card1.icon}
  const card2Props = {...cardProps, icon: card2.icon}
  return (
    <div style={containerStyle}>
      <div>
        <Card {...card1Props}/>
      </div>
      <div style={card2Style}>
        <Card {...card2Props}/>
      </div>
    </div>
  )
}

export default CardPair
