import React, { Component } from 'react'
import Card from '../card/card'
import FoundCards from '../found_cards/found_cards'

export default class Board extends Component {
  constructor() {
    super()
    this.state = {
      firstCard: null,
      disableAll: false,
    }
  }

  handleCardClick(currentCard) {
    const { firstCard } = this.state
    const cards = {}
    if (firstCard) {
      cards['card1'] = firstCard
    }
    cards['card2'] = currentCard
    this.flipCard(cards)
    if (firstCard) {
      if (firstCard.value === currentCard.value) {
        this.handleMatch(cards)
      } else {
        this.handleMismatch(cards)
      }
      this.setState({firstCard: null})
    } else {
      this.setState({firstCard: cards['card2']})
      this.props.renderMessage('select a second card')
    }
  }

  flipCard(cards) {
    const statusChange = {flipped: true}
    const newCardState = Board.updateCardsState(cards, statusChange)
    this.props.updateDeck(newCardState)
  }

  handleFlip(card) {
    return Board.updateCardsState(card, {flipped: true})
  }

  //matched + flipped state become true for both cards
  handleMatch(cards) {
    this.setState({disableAll: true}) //disable every card from being clicked
    const statusChange = {matched: true, flipped: true}
    const newCardState = Board.updateCardsState(cards, statusChange)
    this.props.renderMessage('matched!', true)
    this.resetTurn(newCardState)
  }

  //set flipped state back to false for both cards
  handleMismatch(cards) {
    this.setState({disableAll: true}) //disable every card from being clicked
    const statusChange = {flipped: false}
    const newCardState = Board.updateCardsState(cards, statusChange)
    this.props.renderMessage('mismatched')
    this.resetTurn(newCardState)
  }

  resetTurn(newCardState) {
    setTimeout(() => this.updateAndEnableCards(newCardState), 1000)
    setTimeout(() => this.props.renderMessage('select a new card'), 1500)
  }

  updateAndEnableCards(newCardState) {
    this.props.updateDeck(newCardState)
    this.setState({disableAll: false})
  }

  get boardRender() {
    const { deck } = this.props
    const {disableAll} = this.state

    const deckArray = Object.values(deck)
    return deckArray.map((card) => {
      let {id, value, flipped, matched, icon} = card
      let cardProps = {
        value, flipped, matched, icon, disableAll,
        handleCardClick: () => this.handleCardClick(card)
      }
      return <Card key={id} {...cardProps}/>
    })
  }

  get styles() {
    const { showFoundCards } = this.props
    const boardContainerStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      opacity: showFoundCards ? 0.02 : 1,
      marginLeft: '15px',
      marginRight: '15px',
      maxWidth: '1134px'
    }
    return { boardContainerStyle }
  }

  render() {
    const {matchedPairs, showFoundCards} = this.props
    const foundCardProps = { matchedPairs }
    const { boardContainerStyle } = this.styles
    return (
      <div>
        {showFoundCards ? <FoundCards {...foundCardProps}/> : null}
        <div style={boardContainerStyle}>
          {this.boardRender}
        </div>
      </div>
    )
  }

  //merges every object with the status of my choosing
  static updateCardsState(cards, status) {
    const newCardsState = {}
    for (let key in cards) {
      let currentCard = cards[key]
      newCardsState[currentCard.position] = {
        ...currentCard, ...status
      }
    }
    return newCardsState
  }
}
