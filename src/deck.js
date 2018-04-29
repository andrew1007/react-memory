const values = {
  0: 'A',
  1: '2',
  2: '3',
  3: '4',
  4: '5',
  5: '6',
  6: '7',
  7: '8',
  8: '9',
  9: '10',
  10: 'J',
  11: 'Q',
  12: 'K'
}

const suits = {
  0: 'Heart',
  1: 'Club',
  2: 'Diamond',
  3: 'Spade'
}

const icon = {
  0: require('./images/heart.png'),
  1: require('./images/club.png'),
  2: require('./images/diamond.png'),
  3: require('./images/spade.png')
}

const createDeck = () => {
  let shuffledPositions = [...Array(52)].map((_, idx) => idx)
  for (let i=0; i < shuffledPositions.length; i++) {
    let randomIdx = Math.floor(Math.random() * (52 - i)) + i
    let tempVal = shuffledPositions[randomIdx]
    shuffledPositions[randomIdx] = shuffledPositions[i]
    shuffledPositions[i] = tempVal
  }

  const shuffledDeck = {}
  let posIdx = 0
  for (let suitKey in suits) {
    let currSuit = suits[suitKey]
    let currIcon = icon[suitKey]
    for (let valueKey in values) {
      let currVal = values[valueKey]
      let currPosition = shuffledPositions[posIdx]
      shuffledDeck[currPosition] = {
        id: Math.random(), //ensure unique id when resetting deck
        suit: currSuit,
        value: currVal,
        flipped: false,
        matched: false,
        icon: currIcon,
        position: currPosition
      }
      posIdx += 1
    }
  }
  return shuffledDeck
}

export { createDeck }
