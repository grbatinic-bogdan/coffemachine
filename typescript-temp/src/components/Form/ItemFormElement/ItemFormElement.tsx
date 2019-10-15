import React from 'react'
import './styles.css'

interface IItemFormElementProps {
  name: string
  inputName: string
  checked: boolean
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default ({ name, inputName, checked, onChangeHandler }: IItemFormElementProps) => {
  return (
    <div className="radio-element">
      <input
        type="radio"
        name={inputName}
        value={name}
        id={name.toLowerCase()}
        onChange={onChangeHandler}
        checked={checked}
      />
      <label htmlFor={name.toLowerCase()}>{name}</label>
    </div>
  )
}
