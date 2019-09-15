import { notAsked } from '../../services/remoteData'

export const SET_BEVERAGE_ACTION = 'SET_BEVERAGE'
export const SET_STRENGTH_ACTION = 'SET_STRENGTH'
export const SET_SIZE_ACTION = 'SET_SIZE'
export const SET_MILK_ACTION = 'SET_MILK'
export const SET_SUGAR_ACTION = 'SET_SUGAR'
export const RESET_COFFEE_MACHINE_ACTION = 'RESET_COFFEE_MACHINE'

export const initialState = {
  beverage: notAsked(),
  strength: notAsked(),
  size: notAsked(),
  milk: notAsked(),
  sugar: false,
}

export function formDataReducer(state, action) {
  switch (action.type) {
    case SET_BEVERAGE_ACTION:
      return {
        ...state,
        beverage: action.data,
      }
    case SET_SIZE_ACTION:
      return {
        ...state,
        size: action.data,
      }
    case SET_STRENGTH_ACTION:
      return {
        ...state,
        strength: action.data,
      }
    case SET_MILK_ACTION:
      return {
        ...state,
        milk: action.data,
      }
    case SET_SUGAR_ACTION:
      return {
        ...state,
        sugar: !state.sugar,
      }
    case RESET_COFFEE_MACHINE_ACTION:
      return initialState
    default:
      return state
  }
}
