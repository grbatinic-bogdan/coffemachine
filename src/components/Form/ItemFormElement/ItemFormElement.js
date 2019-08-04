import React from 'react'
import './styles.css'

export default ({ name, inputName, isChecked, onChangeHandler }) => {
  return (
    <div className="radio-element">
      <input
        type="radio"
        name={inputName}
        value={name}
        id={name.toLowerCase()}
        onChange={event => onChangeHandler(event)}
        checked={isChecked}
      />
      <label htmlFor={name.toLowerCase()}>{name}</label>
    </div>
  )
}
