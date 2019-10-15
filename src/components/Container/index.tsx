import React, { useState, useReducer } from 'react'
import Form from '../Form'
import BeverageResponse, { IImageDataResponse } from '../BeverageResponse'
import './style.css'
import { notAsked, IRemoteData } from '../../services/remoteData'
import { formDataReducer, initialState } from '../Form/reducer'
import { IBeverageItem } from '../..'

interface IContainerProps {
  items: IBeverageItem[]
}

export default ({ items }: IContainerProps) => {
  const [formData, dispatch] = useReducer(formDataReducer, initialState)
  const [imageData, setImageData] = useState<IRemoteData<IImageDataResponse, string>>(notAsked())
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
