import React from 'react'
import { isSuccess, notAsked, IRemoteData } from '../../services/remoteData'
import { FormReducerState } from '../Form/reducer'
import { ActionTypes, resetCoffeeMachine } from '../Form/reducer/actions'

export interface ImageDataResponse {
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

interface BeverageResponseProps {
  beverageData: FormReducerState
  imageRemoteData: IRemoteData<ImageDataResponse, string>
  dispatch: React.Dispatch<ActionTypes>
  setImageData: React.Dispatch<React.SetStateAction<IRemoteData<ImageDataResponse, string>>>
}

export default function BeverageResponse({
  beverageData,
  imageRemoteData,
  dispatch,
  setImageData,
}: BeverageResponseProps): React.FunctionComponentElement<BeverageResponseProps> | null {
  const { beverage, strength, size, milk, sugar } = beverageData

  if (!isSuccess(imageRemoteData) || beverage === undefined || size === undefined) {
    return null
  }

  const { data: imageData } = imageRemoteData
  return (
    <div>
      <h1>You ordered {beverage.name}</h1>
      <p>Size: {size}</p>
      {strength && <p>Strength: {strength}</p>}
      {milk && <p>Milk: {milk}</p>}
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
        onClick={(): void => {
          dispatch(resetCoffeeMachine())
          setImageData(notAsked())
        }}
      >
        Order another one
      </button>
    </div>
  )
}
