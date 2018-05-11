import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Game.css'
import Card from './Card'

class Game extends Component {
  onCardClick = id => {
    const items = this.props.items.map(item => {
      if (id !== item.id) {
        return item
      }
      return {
        id,
        isMarked: !item.isMarked,
        value: item.value
      }
    })

    this.props.onChange(items)
  }

  render() {
    return (
      <div className="game">
        {this.props.items.map(item => (
          <Card
            key={item.id}
            isMarked={item.isMarked}
            isFinished={this.props.isFinished}
            value={item.value}
            onClick={() => this.onCardClick(item.id)}
          />
        ))}
      </div>
    )
  }
}

Game.propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  isFinished: PropTypes.bool.isRequired
}

export default Game
