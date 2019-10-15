import React from 'react'
import { isSuccess, notAsked, IRemoteData } from '../../services/remoteData'
import { RESET_COFFEE_MACHINE_ACTION, IFormReducerState, IActionType } from '../Form/reducer'

export interface IImageDataResponse {
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
  user: {
    name: string
    links: {
      self: string
      html: string
      photos: string
      likes: string
      portfolio: string
    }
  }
  alt_description: string
}

interface IBeverageResponseProps {
  beverageData: IFormReducerState
  imageRemoteData: IRemoteData<IImageDataResponse, string>
  dispatch: React.Dispatch<IActionType>
  setImageData: React.Dispatch<React.SetStateAction<IRemoteData<IImageDataResponse, string>>>
}

export default ({
  beverageData,
  imageRemoteData,
  dispatch,
  setImageData,
}: IBeverageResponseProps) => {
  const { beverage, strength, size, milk, sugar } = beverageData

  if (
    !isSuccess(imageRemoteData) ||
    !isSuccess(beverage) ||
    !isSuccess(strength) ||
    !isSuccess(size) ||
    !isSuccess(milk)
  ) {
    return null
  }

  const { data: imageData } = imageRemoteData
  return (
    <div>
      <h1>You ordered {beverage.data.name}</h1>
      <p>Size: {size.data}</p>
      {strength.data && <p>Strength: {strength.data}</p>}
      {milk.data && <p>Milk: {milk.data}</p>}
      <p>Sugar: {sugar ? 'Yes' : 'No'}</p>

      {imageData && imageData.urls && imageData.urls.regular && (
        <img src={imageData.urls.small} alt={imageData.alt_description} />
      )}
      <br />
      <p>
        Photo by{' '}
        <a rel="noopener noreferrer" target="_blank" href={imageData.user.links.html}>
          {imageData.user.name}
        </a>{' '}
        on{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://unsplash.com/?utm_source=${process.env['REACT_APP_UNSPLASH_APP_NAME']}&utm_medium=referral`}
        >
          Unsplash
        </a>
      </p>
      <button
        onClick={() => {
          dispatch({ type: RESET_COFFEE_MACHINE_ACTION })
          setImageData(notAsked())
        }}
      >
        Order another one
      </button>
    </div>
  )
}
