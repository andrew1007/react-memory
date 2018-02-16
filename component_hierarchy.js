<App>//Holds game logic. Gets data from Board, sends to Player's state.
  <Board> //Presentational with click handlers
    <Card/> //Purely presentational
  </Board>
  <Player> //Holds selected cards in state
    <Hand> //Contains matched cards
      <Card/>
    </Hand>
  </Player>
</App>
