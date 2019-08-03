import React from 'react'

export default ({ name, id, value, checked, onChange, label }) => {
  return (
    <>
      <input type="radio" name={name} id={id} value={value} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </>
  )
}
