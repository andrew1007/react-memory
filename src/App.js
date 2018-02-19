import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Deck from './deck'
import Board from './board/board'
import Message from './message/message'
import FoundCards from './found_cards/found_cards'

const containerStyle = {
  display: 'flex',
  flexDirection: 'row'
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
      showFoundCards: false
    }
  }

  componentWillMount() {
    this.initGame()
  }

  initGame = () => {
    this.setState({
      deck: Deck, //Deck is a clean, shuffled deck object, from deck.js
      message: 'Welcome to React Memory'
    })
  }

  //Receives cards from board.js and updates deck
  //keys in this.state.deck are card positions
  //the cards argument is an object of cards that overwrites the previous ones
  updateDeck(cards) {
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
    const { deck, message } = this.state
    const alreadyMatchedCards = Object.values(deck).filter(({matched}) => matched)
    const matchedCardCount = alreadyMatchedCards.length / 2
    const boardProps = {
      deck,
      updateDeck: (cards) => this.updateDeck(cards),
      renderMessage: (string) => this.renderMessage(string)
    }
    const messageProps = {
      matchedCardCount,
      message,
      initGame: this.initGame,
      handleShowFoundCards: this.handleShowFoundCards,
    }
    const foundCardProps = {
      foundCards: alreadyMatchedCards
    }
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
          </div>
          <div style={foundCardStyle}>
            { this.state.showFoundCards ? <FoundCards {...foundCardProps}/> : null}
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

}

export default App;
