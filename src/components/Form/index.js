import React, { useState } from 'react'
import ItemFormElement from './ItemFormElement/ItemFormElement'
import Control from './Control'
import './index.css'

export const COFFEE_TYPE = 'coffee'
export const TEA_TYPE = 'tea'

export default ({ items, setFormData }) => {
  const [beverage, setBeverage] = useState(null)
  const [strength, setStrength] = useState(null)
  const [size, setSize] = useState(null)
  const [milk, setMilk] = useState(null)
  const [sugar, setSugar] = useState(false)

  const beverageOnChange = event => {
    const foundItem = items.find(item => item.name === event.target.value)
    if (foundItem) {
      setBeverage(foundItem)
      if (foundItem.type === TEA_TYPE) {
        setStrength(null)
        setMilk(null)
      }
    } else {
      setBeverage(null)
    }
  }

  const strengthOnChange = event => {
    setStrength(event.target.value)
  }

  const sizeOnChange = event => {
    setSize(event.target.value)
  }

  const milkOnChange = event => {
    setMilk(event.target.value)
  }

  const sugarOnChange = () => {
    setSugar(!sugar)
  }

  const onSubmit = event => {
    event.preventDefault()
    const formData = {
      beverage,
      strength,
      size,
      milk,
      sugar,
    }

    setFormData(formData)
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
