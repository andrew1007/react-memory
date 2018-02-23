import React from 'react'
import CardPair from './card_pair'

const containerStyle = {
  position: 'absolute',
  display: 'flex',
  flexWrap: 'wrap',
  fontSize: '40px',
  height: '80vh',
  width: '97vw',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1
}

const FoundCards = props => {
  const { matchedPairs } = props
  const cardRender = matchedPairs.map(([card1, card2]) => {
    let cardPairProps = {cards: [card1, card2]}
    return <CardPair key={card1.id} {...cardPairProps}/>
  })
  return (
    <div style={containerStyle}>
      {cardRender.length > 0 ? cardRender : 'No cards found yet!'}
    </div>
  )
}

export default FoundCards
