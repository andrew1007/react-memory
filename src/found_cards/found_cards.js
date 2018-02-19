import React from 'react'
import Card from '../card/card'

const containerStyle = {
  maxWidth: '100px',
  fontSize: '25px'
}

const FoundCards = props => {
  const { foundCards } = props
  const cardRender = foundCards.map((card) => {
    let {id, suit, value, flipped, icon, position} = card
    //manually set matched state to false so the cards will be visible,
    //based on logic from card.js
    let cardProps = {id, suit, value, flipped, matched: false, icon, position}
    return <Card key={id} {...cardProps}/>
  })
  return (
    <div style={containerStyle}>
      {cardRender.length > 0 ? cardRender : 'No cards found yet!'}
    </div>
  )
}

export default FoundCards
