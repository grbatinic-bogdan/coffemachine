import React, { useState } from 'react'
import Form from '../Form'
import './style.css'

export default ({ items }) => {
  const [formData, setFormData] = useState(null)
  return (
    <div className="app-container">
      <Form items={items} setFormData={setFormData} />
      {formData && <p>{JSON.stringify(formData, null, 1)}</p>}
    </div>
  )
}
