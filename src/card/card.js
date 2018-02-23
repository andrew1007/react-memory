import React from 'react'
import CardRevealed from './card_revealed'
import CardHidden from './card_hidden'

const cardStyle = {
  border: '3px solid black',
  minHeight: '120px',
  maxWidth: '90px',
  minWidth: '100px',
  margin: '8px',
  backgroundColor: 'white',
  borderRadius: '9px',
  outline: 'none'
}

const matchedCardStyle = {
  ...cardStyle,
  opacity: 0
}
const flippedCardStyle = {
  ...cardStyle,
  border: '3px solid blue',
}

const Card = props => {
  const { value, flipped, disableAll,
    handleCardClick, matched, icon } = props
  let style
  if (matched && flipped) {
    style = matchedCardStyle
  } else if (flipped) {
    style = flippedCardStyle
  } else {
    style = cardStyle
  }
  const cardRevealedProps = { icon, value }
  return (
    <button style={style} onClick={handleCardClick} disabled={matched || flipped || disableAll}>
      {/*change to !flipped if you want cards to be revealed by default, for testing*/}
      { flipped ? <CardRevealed {...cardRevealedProps}/> : <CardHidden/>}
    </button>
  )
}

export default Card
