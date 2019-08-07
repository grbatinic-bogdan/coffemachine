import React, { useState } from 'react'
import Form from '../Form'
import BeverageResponse from '../BeverageResponse'
import './style.css'

export default ({ items }) => {
  const [formData, setFormData] = useState(null)
  const [imageData, setImageData] = useState(null)
  return (
    <div className="app-container">
      {imageData === null && formData === null && (
        <Form items={items} setFormData={setFormData} setImageData={setImageData} />
      )}
      <BeverageResponse
        beverageData={formData}
        imageData={imageData}
        setFormData={setFormData}
        setImageData={setImageData}
      />
    </div>
  )
}
