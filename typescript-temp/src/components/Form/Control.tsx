import React from 'react'
import './ItemFormElement/styles.css'

interface IControlProps {
  name: string
  id: string
  value: string
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  label: string
}

export default ({ name, id, value, checked, onChange, label }: IControlProps) => {
  return (
    <div className="radio-element">
      <input type="radio" name={name} id={id} value={value} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
