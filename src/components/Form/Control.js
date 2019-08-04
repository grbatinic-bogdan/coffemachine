import React from 'react'
import './ItemFormElement/styles.css'

export default ({ name, id, value, checked, onChange, label }) => {
  return (
    <div className="radio-element">
      <input type="radio" name={name} id={id} value={value} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
