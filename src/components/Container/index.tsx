import React, { useState, useReducer } from 'react'
import Form from '../Form'
import BeverageResponse, { ImageDataResponse } from '../BeverageResponse'
import './style.css'
import { notAsked, IRemoteData } from '../../services/remoteData'
import { formDataReducer, initialState } from '../Form/reducer'
import { BeverageItem } from '../..'

interface ContainerProps {
  items: BeverageItem[]
}

export default function Container({
  items,
}: ContainerProps): React.FunctionComponentElement<ContainerProps> {
  const [formData, dispatch] = useReducer(formDataReducer, initialState)
  const [imageData, setImageData] = useState<IRemoteData<ImageDataResponse, string>>(notAsked())
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
