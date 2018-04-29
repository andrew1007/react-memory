import React, { Component } from 'react';
import './App.css';
import * as Deck from './deck'
import Board from './board/board'
import Message from './message/message'

class App extends Component {
  constructor() {
    super()
    this.state = {
      deck: {}, //Object that holds entire deck during game, made in deck.js
      matchedPairs: [],
      showFoundCards: false,
      showWelcome: true
    }
  }
  /*Sample card object in Deck = {
  [cardPosition]: {
    id, suit, value, flipped, matched, icon, position
  }*/

  componentWillMount() {
    this.initGame()
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({showWelcome: false})
    }, 3000)
  }

  initGame = () => {
    //clear all timeouts
    this.setState({
      deck: Deck.createDeck(), //Deck is a clean, shuffled deck object, from deck.js
      matchedPairs: [],
      message: 'React Memory'
    })
    setTimeout(() => {
      if (this.state.message === '') {
        this.setState({message: 'select a card'})
      }
    }, 3000)
  }

  /* updateDeck
  -Receives cards from board.js and updates deck
  -cards is 1 card when first card is being flipped, cards is 2 when match checking
  -keys in this.state.deck are card positions
  -the cards argument is an object of cards that overwrites the previous ones
  -ex: original this.state.deck -> {10: {value: 'A', flipped:false, matched: true}}
  cards argument in updateDeck -> {10: {value: 'A', flipped: true, matched: true}}
  {this.state.deck, ...cards} -> {10 :{value: 'A', flipped: true, matched: true}}
  flipped is now true, and now the Ace at position 10 is revealed!
  */
  updateDeck = (cards) => {
    const { matchedPairs, deck } = this.state
    if (App.isMatchedPair(cards)) {
      this.setState({
        matchedPairs: [...matchedPairs, Object.values(cards)]
      })
    }
    this.setState({deck: {...deck, ...cards}}, () => {
      if (App.winningDeck(this.state.deck)) {
        setTimeout(() => this.renderMessage('You won'), 1000)
      }
    })
  }

  renderMessage = (string, matched) => {
    this.setState({message: string})
    if (matched) {
      setTimeout(() => {
        this.setState({message: 'select a card'})
      }, 1000)
    }
  }

  handleShowFoundCards = () => { //toggles FoundCards
    const { showFoundCards } = this.state
    this.setState({showFoundCards: !showFoundCards}, () => {
      this.setState({message: showFoundCards ? 'Matches' : 'select a card'})
    })
  }

  get componentProps() {
    const { deck, message, matchedPairs, showFoundCards } = this.state
    const { updateDeck, renderMessage,
      initGame, handleShowFoundCards } = this
    const matchedCardCount = matchedPairs.length
    //updateDeck and renderMessage are functions
    const boardProps = { deck, updateDeck, renderMessage, matchedPairs, showFoundCards }
    //initGame and handleShowFoundCards are functions
    const messageProps = {
      matchedCardCount, message, showFoundCards,
      initGame, handleShowFoundCards,
    }
    return { boardProps, messageProps }
  }

  get styles() {
    const { showWelcome } = this.state
    const welcomeStyle = {
      paddingBottom: '10vh',
      fontSize: '4em',
      height: showWelcome ? '0vh' : '0vh'
    }
    if (!showWelcome) {
      const zeroHeight = '0vh'
      welcomeStyle['margin'] = zeroHeight
      welcomeStyle['height'] = zeroHeight
      welcomeStyle['padding'] = zeroHeight
    }
    const containerStyle = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    }
    
    let welcomeStyleContainer = {
      ...containerStyle,
      alignItems: 'center'
    }
    
    const boardStyle = {
      display: 'flex',
      flexDirection: 'column'
    }
    return { welcomeStyle, containerStyle, welcomeStyleContainer, boardStyle }
  }

  get classNames() {
    const { showWelcome } = this.state
    const boardContainerClass = showWelcome ? 'hide' : 'show'
    const welcomeClass = showWelcome ? 'show' : 'hide'
    return { welcomeClass, boardContainerClass }
  }

  render() {
    const { boardProps, messageProps } = this.componentProps
    const { welcomeStyle, containerStyle, 
      welcomeStyleContainer, boardStyle } = this.styles
    const { welcomeClass, boardContainerClass } = this.classNames
    return (
      <div className="App">
        <header className="App-header">
          <Message {...messageProps}/>
        </header>
        <div style={containerStyle} className={boardContainerClass}>
          <div style={boardStyle}>
            <Board {...boardProps}/>
          </div>
        </div>
        <div style={welcomeStyleContainer}>
          <div style={welcomeStyle} className={welcomeClass}>
            Welcome to React Memory
          </div>
        </div>
      </div>
    )
  }

  //you win when every card in this.state.deck has matched:true
  static winningDeck(deck) {
    const cards = Object.values(deck)
    return cards.every(({matched}) => matched)
  }

  static isMatchedPair(cards) {
    const cardArr = Object.values(cards)
    return cardArr.every(({matched}) => matched)
  }
}

export default App;
