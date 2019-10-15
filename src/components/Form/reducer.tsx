import { notAsked, IRemoteData, success } from '../../services/remoteData'
import { IBeverageItem } from '../..'

export const SET_BEVERAGE_ACTION = 'SET_BEVERAGE'
export const SET_STRENGTH_ACTION = 'SET_STRENGTH'
export const SET_SIZE_ACTION = 'SET_SIZE'
export const SET_MILK_ACTION = 'SET_MILK'
export const SET_SUGAR_ACTION = 'SET_SUGAR'
export const RESET_COFFEE_MACHINE_ACTION = 'RESET_COFFEE_MACHINE'

export type Strength = 'Low' | 'Normal' | 'Strong'
export type Size = 'Small' | 'Normal' | 'Large'
export type Milk = 'No' | 'Normal' | 'Large'

export interface FormReducerState {
  beverage: IRemoteData<IBeverageItem, string>
  strength: IRemoteData<Strength, string>
  size: IRemoteData<Size, string>
  milk: IRemoteData<Milk, string>
  sugar: boolean
}

type SetBeverage = 'SET_BEVERAGE'
type SetStrength = 'SET_STRENGTH'
type SetSize = 'SET_SIZE'
type SetMilk = 'SET_MILK'
type SetSugar = 'SET_SUGAR'
type ResetCoffeeMachine = 'RESET_COFFEE_MACHINE'

type FormReducerActions =
  | SetBeverage
  | SetStrength
  | SetSize
  | SetMilk
  | SetSugar
  | ResetCoffeeMachine

export const initialState: FormReducerState = {
  beverage: notAsked(),
  strength: notAsked(),
  size: notAsked(),
  milk: notAsked(),
  sugar: false,
}

export interface ActionType {
  type: FormReducerActions
  data?: any
}

export function formDataReducer(state: FormReducerState, action: ActionType): FormReducerState {
  const isSuccess = action.data !== null
  const data = isSuccess ? success(action.data) : notAsked()
  switch (action.type) {
    case SET_BEVERAGE_ACTION:
      return {
        ...state,
        beverage: data,
      }
    case SET_SIZE_ACTION:
      return {
        ...state,
        size: data,
      }
    case SET_STRENGTH_ACTION:
      return {
        ...state,
        strength: data,
      }
    case SET_MILK_ACTION:
      return {
        ...state,
        milk: data,
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
