import React, { useState, useReducer } from 'react'
import Form from '../Form'
import BeverageResponse from '../BeverageResponse'
import './style.css'
import { notAsked } from '../../services/remoteData'
import { formDataReducer, initialState } from '../Form/reducer'

export default ({ items }) => {
  const [formData, dispatch] = useReducer(formDataReducer, initialState)
  const [imageData, setImageData] = useState(notAsked())
  return (
    <div className="app-container">
      <Form
        items={items}
        setImageData={setImageData}
        imageData={imageData}
        formData={formData}
        dispatch={dispatch}
      />
      <BeverageResponse
        beverageData={formData}
        imageRemoteData={imageData}
        setImageData={setImageData}
        dispatch={dispatch}
      />
    </div>
  )
}
