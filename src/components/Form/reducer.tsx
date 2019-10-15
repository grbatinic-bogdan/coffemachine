import { notAsked, IRemoteData } from '../../services/remoteData'
import { IBeverageItem } from '../..'

export const SET_BEVERAGE_ACTION = 'SET_BEVERAGE'
export const SET_STRENGTH_ACTION = 'SET_STRENGTH'
export const SET_SIZE_ACTION = 'SET_SIZE'
export const SET_MILK_ACTION = 'SET_MILK'
export const SET_SUGAR_ACTION = 'SET_SUGAR'
export const RESET_COFFEE_MACHINE_ACTION = 'RESET_COFFEE_MACHINE'

export type LowStrength = 'Low'
export type NormalStrength = 'Normal'
export type StrongStrength = 'Strong'

export type SmallSize = 'Small'
export type NormalSize = 'Normal'
export type LargeSize = 'Large'

export type NoMilk = 'No'
export type NormalMilk = 'Normal'
export type LargeMilk = 'Large'

export type Strength = 'Low' | 'Normal' | 'Strong'
export type Size = 'Small' | 'Normal' | 'Large'
export type Milk = 'No' | 'Normal' | 'Large'

export interface IFormReducerState {
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

export const initialState: IFormReducerState = {
  beverage: notAsked(),
  strength: notAsked(),
  size: notAsked(),
  milk: notAsked(),
  sugar: false,
}

export interface IActionType {
  type: FormReducerActions
  data?: any
}

export function formDataReducer(state: IFormReducerState, action: IActionType): IFormReducerState {
  switch (action.type) {
    case SET_BEVERAGE_ACTION:
      return {
        ...state,
        beverage: {
          type: 'SUCCESS',
          data: action.data,
        },
      }
    case SET_SIZE_ACTION:
      return {
        ...state,
        size: {
          type: 'SUCCESS',
          data: action.data,
        },
      }
    case SET_STRENGTH_ACTION:
      return {
        ...state,
        strength: {
          type: 'SUCCESS',
          data: action.data,
        },
      }
    case SET_MILK_ACTION:
      return {
        ...state,
        milk: {
          type: 'SUCCESS',
          data: action.data,
        },
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
