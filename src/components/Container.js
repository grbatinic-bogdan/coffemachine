import React, { useState } from 'react'
import Form from './Form'

export default ({ items }) => {
  const [formData, setFormData] = useState(null)
  return (
    <>
      <Form items={items} setFormData={setFormData} />
      {formData && <p>{JSON.stringify(formData, null, 1)}</p>}
    </>
  )
}
