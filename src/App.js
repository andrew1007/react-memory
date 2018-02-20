import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Deck from './deck'
import Board from './board/board'
import Message from './message/message'
import FoundCards from './found_cards/found_cards'

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center'
}
const boardStyle = {
  display: 'flex',
  flexDirection: 'column'
}
const foundCardStyle = {
  display: 'flex',
  flexDirection: 'column'
}
/*Deck = {
  [cardPosition]: {
    id, suit, value, flipped, matched, icon, position
  }
*/
class App extends Component {
  constructor() {
    super()
    this.state = {
      deck: {}, //Object that holds entire deck during game, made in deck.js
      matchedPairs: [],
      showFoundCards: false
    }
  }

  componentWillMount() {
    this.initGame()
  }

  initGame = () => {
    this.setState({
      deck: Deck, //Deck is a clean, shuffled deck object, from deck.js
      matchedPairs: [],
      message: 'Welcome to React Memory'
    })
  }

  //Receives cards from board.js and updates deck
  //keys in this.state.deck are card positions
  //the cards argument is an object of cards that overwrites the previous ones
  updateDeck(cards) {
    if (App.isMatchedPair(cards)) {
      this.setState({
        matchedPairs: [...this.state.matchedPairs, Object.values(cards)]
      })
    }
    this.setState({deck: {...this.state.deck, ...cards}}, () => {
      if (App.winningDeck(this.state.deck)) {
        setTimeout(() => this.renderMessage('You won'), 1000)
      }
    })
  }

  renderMessage(string, matched) {
    this.setState({message: string})
    if (matched) {
      setTimeout(() => {
        this.setState({message: 'select a card'})
      }, 1000)
    }
  }

  handleShowFoundCards = () => { //toggles FoundCards
    this.setState({showFoundCards: !this.state.showFoundCards})
  }

  render() {
    const { deck, message, matchedPairs, showFoundCards } = this.state
    const matchedCardCount = matchedPairs.length
    const boardProps = {
      deck,
      updateDeck: (cards) => this.updateDeck(cards),
      renderMessage: (string) => this.renderMessage(string)
    }
    const messageProps = {
      matchedCardCount, message, showFoundCards,
      initGame: this.initGame,
      handleShowFoundCards: this.handleShowFoundCards,
    }
    const foundCardProps = { matchedPairs }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Memory</h1>
        </header>
        <div style={containerStyle}>
          <div style={boardStyle}>
            <Message {...messageProps}/>
            <Board {...boardProps}/>
            <div style={foundCardStyle}>
              { showFoundCards ? <FoundCards {...foundCardProps}/> : null}
            </div>
          </div>
        </div>
      </div>
    );
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
