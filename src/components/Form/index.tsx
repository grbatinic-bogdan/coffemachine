import React from 'react'
import axios from 'axios'
import ItemFormElement from './ItemFormElement/ItemFormElement'
import Control from './Control'
import './index.css'
import {
  pending,
  success,
  isPending,
  isSuccess,
  failure,
  IRemoteData,
  isNotAsked,
} from '../../services/remoteData'
import {
  SET_BEVERAGE_ACTION,
  SET_STRENGTH_ACTION,
  SET_MILK_ACTION,
  SET_SIZE_ACTION,
  SET_SUGAR_ACTION,
  ActionType,
  FormReducerState,
} from './reducer'
import { IBeverageItem } from '../..'
import { ImageDataResponse } from '../BeverageResponse'

export const COFFEE_TYPE = 'coffee'
export const TEA_TYPE = 'tea'

interface FormProps {
  items: IBeverageItem[]
  dispatch: React.Dispatch<ActionType>
  setImageData: React.Dispatch<React.SetStateAction<IRemoteData<ImageDataResponse, string>>>
  imageData: IRemoteData<ImageDataResponse, string>
  formData: FormReducerState
}

export default function Form({
  items,
  dispatch,
  setImageData,
  imageData,
  formData,
}: FormProps): React.FunctionComponentElement<FormProps> | null {
  const { beverage, size, strength, milk, sugar } = formData
  const beverageOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const foundItem = items.find(item => item.name === event.target.value)
    dispatch({ type: SET_BEVERAGE_ACTION, data: foundItem })
    if (foundItem) {
      if (foundItem.type === TEA_TYPE) {
        dispatch({ type: SET_STRENGTH_ACTION, data: null })
        dispatch({ type: SET_MILK_ACTION, data: null })
      }
    }
  }

  const strengthOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({ type: SET_STRENGTH_ACTION, data: event.target.value })
  }

  const sizeOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({ type: SET_SIZE_ACTION, data: event.target.value })
  }

  const milkOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({ type: SET_MILK_ACTION, data: event.target.value })
  }

  const sugarOnChange = (): void => {
    dispatch({ type: SET_SUGAR_ACTION })
  }

  const onSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    if (isSuccess(beverage)) {
      try {
        setImageData(pending())
        const imageResponse = await axios.get(
          `https://api.unsplash.com/photos/random?query=${beverage.data.name}`,
          {
            headers: {
              Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
            },
          },
        )
        setImageData(success(imageResponse.data))
      } catch (error) {
        setImageData(failure("Unable to create coffe, we're sorry :("))
      }
    }
  }

  const showSubmitButton = (): boolean => {
    //const hasBeverage = isSuccess<IBeverageItem, string>(beverage)
    //const hasSize = size !== null
    const hasStrength =
      isSuccess<IBeverageItem, string>(beverage) &&
      ((beverage.data.type === 'coffee' && isSuccess(strength)) ||
        (beverage.data.type === 'tea' && isNotAsked(strength)))
    const hasMilk =
      isSuccess<IBeverageItem, string>(beverage) &&
      ((beverage.data.type === 'coffee' && isSuccess(milk)) ||
        (beverage.data.type === 'tea' && isNotAsked(milk)))

    return isSuccess<IBeverageItem, string>(beverage) && isSuccess(size) && hasStrength && hasMilk
  }

  const showStrength =
    isSuccess<IBeverageItem, string>(beverage) && beverage.data.type === COFFEE_TYPE
  const showSubmit = showSubmitButton()

  const showMilk = isSuccess<IBeverageItem, string>(beverage) && beverage.data.type === COFFEE_TYPE

  if (isSuccess(imageData) && formData !== null) {
    return null
  }

  if (isPending(imageData)) {
    return <h1>Brewing your {beverage.type}, please wait</h1>
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-container">
        <section className="beverages-column">
          <p className="beverage-select-heading">Select your beverage</p>
          {items.map(item => {
            const checked =
              isSuccess<IBeverageItem, string>(beverage) && beverage.data.name === item.name
            return (
              <ItemFormElement
                key={item.name}
                name={item.name}
                inputName="beverage"
                checked={checked}
                onChangeHandler={beverageOnChange}
              />
            )
          })}
        </section>
        <section className="control-column">
          {showStrength && (
            <>
              <p>Select coffe strength</p>
              <div className="control-group">
                <Control
                  name="strength"
                  id="lowstrength"
                  value="Low"
                  checked={isSuccess(strength) && strength.data === 'Low'}
                  onChange={strengthOnChange}
                  label="Low"
                />
                <Control
                  name="strength"
                  id="normalstrength"
                  value="Normal"
                  checked={isSuccess(strength) && strength.data === 'Normal'}
                  onChange={strengthOnChange}
                  label="Normal"
                />
                <Control
                  name="strength"
                  id="strongstrength"
                  value="Strong"
                  checked={isSuccess(strength) && strength.data === 'Strong'}
                  onChange={strengthOnChange}
                  label="Strong"
                />
              </div>
            </>
          )}
          <p>Select size</p>
          <div className="control-group">
            <Control
              name="size"
              id="smallsize"
              value="Small"
              checked={isSuccess(size) && size.data === 'Small'}
              onChange={sizeOnChange}
              label="Small"
            />
            <Control
              name="size"
              id="normalsize"
              value="Normal"
              checked={isSuccess(size) && size.data === 'Normal'}
              onChange={sizeOnChange}
              label="Normal"
            />
            <Control
              name="size"
              id="largesize"
              value="Large"
              checked={isSuccess(size) && size.data === 'Large'}
              onChange={sizeOnChange}
              label="Large"
            />
          </div>
          {showMilk && (
            <>
              <p>Milk</p>
              <div className="control-group">
                <Control
                  name="milk"
                  id="nomilk"
                  value="No"
                  checked={isSuccess(milk) && milk.data === 'No'}
                  onChange={milkOnChange}
                  label="No"
                />
                <Control
                  name="milk"
                  id="normalmilk"
                  value="Normal"
                  checked={isSuccess(milk) && milk.data === 'Normal'}
                  onChange={milkOnChange}
                  label="Normal"
                />
                <Control
                  name="milk"
                  id="largemilk"
                  value="Large"
                  checked={isSuccess(milk) && milk.data === 'Large'}
                  onChange={milkOnChange}
                  label="Large"
                />
              </div>
            </>
          )}
          <div>
            <input type="checkbox" id="havesugar" checked={sugar} onChange={sugarOnChange} />
            <label htmlFor="havesugar">Sugar</label>
          </div>
        </section>
        {showSubmit && (
          <div className="submit-container">
            <input className="submit-button" type="submit" value="Confirm" />
          </div>
        )}
      </div>
    </form>
  )
}
