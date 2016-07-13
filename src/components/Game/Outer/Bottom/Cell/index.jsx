import React from 'react';
import styles from './styles.css';
import styleForCellState from './styleForCellState';
import {isEqual} from 'lodash';

const now = () => (new Date()).getTime();

class Cell extends React.Component {
  constructor(props) {
    super(props);
    props.game.onCellStateChange(
      (cell, state) => {
        if (isEqual(cell, props.position)) {
          const style = styles[styleForCellState(state)];
          this.setState({style: style});
        }
      }
    );
    this.onTouchStart = (event) => {
      this.setState({clickStart: now()});
    };
    this.onMouseDown = (event) => {
      event.preventDefault();
    };
    this.onTouchEnd = (event) => {
      const duration = now() - this.state.clickStart;
      if (duration < 500) {
        props.game.reveal(props.position);
      } else {
        props.game.mark(props.position);
      }
    };
    this.onMouseUp = (event) => {
      event.preventDefault();
      props.game.reveal(props.position);
    };
    this.state = { style: styles.unknown };
  }

  render() {
    const className = `${styles.field} ${this.state.style}`;
    return <td onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onTouchEnd={this.onTouchEnd} onTouchStart={this.onTouchStart} className={className} />;
  }
}

export default Cell;
