import React from 'react'
import CardPair from './card_pair'

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  maxWidth: '1325px',
  fontSize: '40px'
}

const FoundCards = props => {
  const { matchedPairs } = props
  const cardRender = matchedPairs.map(([card1, card2]) => {
    let cardPairProps = {cards: [card1, card2]}
    return <CardPair {...cardPairProps}/>
  })
  return (
    <div style={containerStyle}>
      {cardRender.length > 0 ? cardRender : 'No cards found yet!'}
    </div>
  )
}

export default FoundCards
