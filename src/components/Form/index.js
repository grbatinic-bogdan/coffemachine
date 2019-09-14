import React from 'react'
import axios from 'axios'
import ItemFormElement from './ItemFormElement/ItemFormElement'
import Control from './Control'
import './index.css'
import { pending, success, isPending, isSuccess, failure } from '../../services/remoteData'
import {
  SET_BEVERAGE_ACTION,
  SET_STRENGTH_ACTION,
  SET_MILK_ACTION,
  SET_SIZE_ACTION,
  SET_SUGAR_ACTION,
} from './reducer'

export const COFFEE_TYPE = 'coffee'
export const TEA_TYPE = 'tea'

export default ({ items, dispatch, setImageData, imageData, formData }) => {
  /*
  const [beverage, setBeverage] = useState(null)
  const [strength, setStrength] = useState(null)
  const [size, setSize] = useState(null)
  const [milk, setMilk] = useState(null)
  const [sugar, setSugar] = useState(false)
  */
  const { beverage, size, strength, milk, sugar } = formData
  const beverageOnChange = event => {
    const foundItem = items.find(item => item.name === event.target.value)
    dispatch({ type: SET_BEVERAGE_ACTION, data: foundItem })
    if (foundItem) {
      if (foundItem.type === TEA_TYPE) {
        dispatch({ type: SET_STRENGTH_ACTION, data: null })
        dispatch({ type: SET_MILK_ACTION, data: null })
      }
    }
  }

  const strengthOnChange = event => {
    dispatch({ type: SET_STRENGTH_ACTION, data: event.target.value })
  }

  const sizeOnChange = event => {
    dispatch({ type: SET_SIZE_ACTION, data: event.target.value })
  }

  const milkOnChange = event => {
    dispatch({ type: SET_MILK_ACTION, data: event.target.value })
  }

  const sugarOnChange = () => {
    dispatch({ type: SET_SUGAR_ACTION })
  }

  const onSubmit = async event => {
    event.preventDefault()
    try {
      setImageData(pending())
      const imageResponse = await axios.get(
        `https://api.unsplash.com/photos/random?query=${beverage.name}`,
        {
          headers: {
            Authorization: `Client-ID ${process.env['REACT_APP_UNSPLASH_API_KEY']}`,
          },
        },
      )
      setImageData(success(imageResponse.data))
    } catch (error) {
      setImageData(failure("Unable to create coffe, we're sorry :("))
    }
  }

  const showSubmitButton = () => {
    const hasBeverage = beverage !== null
    const hasSize = size !== null
    const hasStrength =
      beverage &&
      ((beverage.type === COFFEE_TYPE && strength !== null) ||
        (beverage.type === TEA_TYPE && strength === null))
    const hasMilk =
      beverage &&
      ((beverage.type === COFFEE_TYPE && milk !== null) ||
        (beverage.type === TEA_TYPE && milk === null))

    return hasBeverage && hasSize && hasStrength && hasMilk
  }

  const showStrength = beverage && beverage.type === COFFEE_TYPE
  const showSubmit = showSubmitButton()

  const showMilk = beverage && beverage.type === COFFEE_TYPE

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
            const checked = beverage && beverage.name === item.name
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
                  isChecked={strength === 'Low'}
                  onChange={strengthOnChange}
                  label="Low"
                />
                <Control
                  name="strength"
                  id="normalstrength"
                  value="Normal"
                  isChecked={strength === 'Normal'}
                  onChange={strengthOnChange}
                  label="Normal"
                />
                <Control
                  name="strength"
                  id="strongstrength"
                  value="Strong"
                  isChecked={strength === 'Strong'}
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
              isChecked={size === 'Small'}
              onChange={sizeOnChange}
              label="Small"
            />
            <Control
              name="size"
              id="normalsize"
              value="Normal"
              isChecked={size === 'Normal'}
              onChange={sizeOnChange}
              label="Normal"
            />
            <Control
              name="size"
              id="largesize"
              value="Large"
              isChecked={size === 'Large'}
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
                  isChecked={milk === 'No'}
                  onChange={milkOnChange}
                  label="No"
                />
                <Control
                  name="milk"
                  id="normalmilk"
                  value="Normal"
                  isChecked={milk === 'Normal'}
                  onChange={milkOnChange}
                  label="Normal"
                />
                <Control
                  name="milk"
                  id="largemilk"
                  value="Large"
                  isChecked={milk === 'Large'}
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
