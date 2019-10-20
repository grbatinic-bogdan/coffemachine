import React from 'react'
import './ItemFormElement/styles.css'

interface ControlProps {
  name: string
  id: string
  value: string
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  label: string
}

export default function Control({
  name,
  id,
  value,
  checked,
  onChange,
  label,
}: ControlProps): React.FunctionComponentElement<ControlProps> {
  return (
    <div className="radio-element">
      <input type="radio" name={name} id={id} value={value} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
