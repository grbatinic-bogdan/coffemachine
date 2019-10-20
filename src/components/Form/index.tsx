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
} from '../../services/remoteData'
import { FormReducerState } from './reducer'
import { BeverageItem } from '../..'
import { ImageDataResponse } from '../BeverageResponse'
import {
  ActionTypes,
  setBeverage,
  unsetStrengthAction,
  unsetMilkAction,
  setStrength,
  Strength,
  setSize,
  Size,
  setMilk,
  Milk,
  toggleSugar,
} from './reducer/actions'

export const COFFEE_TYPE = 'coffee'
export const TEA_TYPE = 'tea'

interface FormProps {
  items: BeverageItem[]
  dispatch: React.Dispatch<ActionTypes>
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
    if (foundItem) {
      dispatch(setBeverage(foundItem))
    }
    if (foundItem) {
      if (foundItem.type === TEA_TYPE) {
        dispatch(unsetStrengthAction())
        dispatch(unsetMilkAction())
      }
    }
  }

  const strengthOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setStrength(event.target.value as Strength))
  }

  const sizeOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSize(event.target.value as Size))
  }

  const milkOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setMilk(event.target.value as Milk))
  }

  const sugarOnChange = (): void => {
    dispatch(toggleSugar())
  }

  const onSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    if (beverage) {
      try {
        setImageData(pending())
        const imageResponse = await axios.get(
          `https://api.unsplash.com/photos/random?query=${beverage.name}`,
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
    const isStrengthSelected = strength !== undefined
    const hasStrength: boolean =
      beverage !== undefined &&
      ((beverage.type === 'coffee' && isStrengthSelected) ||
        (beverage.type === 'tea' && !isStrengthSelected))
    const hasMilk: boolean =
      beverage !== undefined &&
      ((beverage.type === 'coffee' && milk !== undefined) ||
        (beverage.type === 'tea' && milk === undefined))

    return beverage !== undefined && size !== undefined && hasStrength && hasMilk
  }

  const showStrength: boolean = beverage !== undefined && beverage.type === COFFEE_TYPE
  const showSubmit = showSubmitButton()

  const showMilk = beverage !== undefined && beverage.type === COFFEE_TYPE

  if (isSuccess(imageData) && formData !== null) {
    return null
  }

  if (isPending(imageData) && beverage !== undefined) {
    return <h1>Brewing your {beverage.type}, please wait</h1>
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-container">
        <section className="beverages-column">
          <p className="beverage-select-heading">Select your beverage</p>
          {items.map(item => {
            const checked: boolean = beverage !== undefined && beverage.name === item.name
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
                  checked={strength !== undefined && strength === 'Low'}
                  onChange={strengthOnChange}
                  label="Low"
                />
                <Control
                  name="strength"
                  id="normalstrength"
                  value="Normal"
                  checked={strength !== undefined && strength === 'Normal'}
                  onChange={strengthOnChange}
                  label="Normal"
                />
                <Control
                  name="strength"
                  id="strongstrength"
                  value="Strong"
                  checked={strength !== undefined && strength === 'Strong'}
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
              checked={size !== undefined && size === 'Small'}
              onChange={sizeOnChange}
              label="Small"
            />
            <Control
              name="size"
              id="normalsize"
              value="Normal"
              checked={size !== undefined && size === 'Normal'}
              onChange={sizeOnChange}
              label="Normal"
            />
            <Control
              name="size"
              id="largesize"
              value="Large"
              checked={size !== undefined && size === 'Large'}
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
                  checked={milk !== undefined && milk === 'No'}
                  onChange={milkOnChange}
                  label="No"
                />
                <Control
                  name="milk"
                  id="normalmilk"
                  value="Normal"
                  checked={milk !== undefined && milk === 'Normal'}
                  onChange={milkOnChange}
                  label="Normal"
                />
                <Control
                  name="milk"
                  id="largemilk"
                  value="Large"
                  checked={milk !== undefined && milk === 'Large'}
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
