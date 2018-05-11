import React from 'react'
import PropTypes from 'prop-types'
import './Card.css'

function Card({ onClick, isMarked, value, isFinished }) {
  return (
    <div className="card" onClick={onClick}>
      {isMarked ? <p>Marked</p> : null}
      {isFinished && (value && <p style={{ color: 'red' }}>{value}</p>)}
    </div>
  )
}

Card.propTypes = {
  onClick: PropTypes.func.isRequired,
  isMarked: PropTypes.bool.isRequired,
  isFinished: PropTypes.bool.isRequired,
  value: PropTypes.string
}

export default Card
