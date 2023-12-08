import React from 'react';
import Title from './Title';
import Outer from './Outer';
import styles from './styles.css';

class Game extends React.Component {
  getChildContext() {
    return { 
      game: this.props.game, 
      tileSize: this.props.tileSize
    };
  }

  render() {
    const cols = this.props.game.dimensions[1];
    const width = cols * this.props.tileSize + 20;

    return (
      <div className={styles.minesweeper} style={{width: width}}>
        <Title />
        <Outer />
      </div>
    );
  }
}

Game.childContextTypes = {
  game: React.PropTypes.object,
  tileSize: React.PropTypes.number
};

export default Game;
