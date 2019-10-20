import { notAsked, IRemoteData } from '../../services/remoteData'
import { BeverageItem } from '../..'
import {
  Strength,
  Size,
  Milk,
  ActionTypes,
  SET_BEVERAGE_ACTION,
  SET_SIZE_ACTION,
  SET_STRENGTH_ACTION,
  SET_MILK_ACTION,
  SET_SUGAR_ACTION,
  UNSET_STRENGTH_ACTION,
  UNSET_MILK_ACTION,
  RESET_COFFEE_MACHINE_ACTION,
} from './reducer/actions'

export interface FormReducerState {
  beverage: BeverageItem | undefined
  strength: Strength | undefined
  size: IRemoteData<Size, string>
  milk: IRemoteData<Milk, string>
  sugar: boolean
}

export const initialState: FormReducerState = {
  beverage: undefined,
  strength: undefined,
  size: notAsked(),
  milk: notAsked(),
  sugar: false,
}

export function formDataReducer(state: FormReducerState, action: ActionTypes): FormReducerState {
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
    case UNSET_STRENGTH_ACTION:
      return {
        ...state,
        strength: undefined,
      }
    case UNSET_MILK_ACTION:
      return {
        ...state,
        milk: notAsked(),
      }
    case RESET_COFFEE_MACHINE_ACTION:
      return initialState
    default:
      return state
  }
}
