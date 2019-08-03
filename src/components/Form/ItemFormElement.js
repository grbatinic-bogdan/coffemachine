import React from 'react'

export default ({ name, inputName, isChecked, onChangeHandler }) => {
  return (
    <>
      <input
        type="radio"
        name={inputName}
        value={name}
        id={name.toLowerCase()}
        onChange={event => onChangeHandler(event)}
        checked={isChecked}
      />
      <label htmlFor={name.toLowerCase()}>{name}</label>
    </>
  )
}
