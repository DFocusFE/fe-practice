import React, { Component } from 'react'
import './Application.css'
import Game from './components/Game'

import { createItems } from './utils/gameHelper'

class Application extends Component {
  constructor() {
    super()
    this.state = this._getNewState()
  }

  _getNewState() {
    return {
      items: createItems(),
      answer: null,
      isFinished: false
    }
  }

  setAnswer = items => {
    const isTwoItemsMarked = items.filter(item => item.isMarked).length === 2
    const noValueMarked = !items.some(item => item.isMarked && item.value)

    this.setState({
      items,
      answer: isTwoItemsMarked && noValueMarked
    })
  }

  guess = () => {
    this.setState({
      isFinished: true
    })
    setTimeout(() => {
      alert(this.state.answer ? '恭喜你猜对了' : '抱歉你猜错了')
    })
  }

  refresh = () => {
    this.setState(this._getNewState())
  }

  render() {
    return (
      <div className="game-container">
        <div className="game-area">
          <Game
            items={this.state.items}
            onChange={this.setAnswer}
            isFinished={this.state.isFinished}
          />
          <div className="operation">
            <button className="btn" onClick={this.refresh}>
              刷新
            </button>
            <button className="btn" onClick={this.guess}>
              猜测
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Application
