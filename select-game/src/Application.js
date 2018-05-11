import React, { Component } from 'react'
import './Application.css'
// import Game from './components/Game'

class Application extends Component {
  render() {
    return (
      <div className="game-container">
        <div className="game-area">
          {/* 
            你要在这里完成你的任务哦
            <Game />
           */}
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
