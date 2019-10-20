import { BeverageItem } from '../../..'
import { IRemoteData, success } from '../../../services/remoteData'

export const SET_BEVERAGE_ACTION = 'SET_BEVERAGE'
export const SET_STRENGTH_ACTION = 'SET_STRENGTH'
export const SET_SIZE_ACTION = 'SET_SIZE'
export const SET_MILK_ACTION = 'SET_MILK'
export const SET_SUGAR_ACTION = 'SET_SUGAR'
export const RESET_COFFEE_MACHINE_ACTION = 'RESET_COFFEE_MACHINE'
export const UNSET_STRENGTH_ACTION = 'UNSET_STRENGTH_ACTION'
export const UNSET_MILK_ACTION = 'UNSET_MILK_ACTION'

export type Strength = 'Low' | 'Normal' | 'Strong'
export type Size = 'Small' | 'Normal' | 'Large'
export type Milk = 'No' | 'Normal' | 'Large'

interface SetBeverageAction {
  type: typeof SET_BEVERAGE_ACTION
  data: BeverageItem
}

interface SetStrengthAction {
  type: typeof SET_STRENGTH_ACTION
  data: Strength
}

interface SetSizeAction {
  type: typeof SET_SIZE_ACTION
  data: IRemoteData<Size, string>
}

interface SetMilkAction {
  type: typeof SET_MILK_ACTION
  data: IRemoteData<Milk, string>
}

interface SetSugarAction {
  type: typeof SET_SUGAR_ACTION
}

interface ResetCoffeeMachineAction {
  type: typeof RESET_COFFEE_MACHINE_ACTION
}

interface UnsetStrengthAction {
  type: typeof UNSET_STRENGTH_ACTION
}

interface UnsetMilkAction {
  type: typeof UNSET_MILK_ACTION
}

export type ActionTypes =
  | SetBeverageAction
  | SetStrengthAction
  | SetSizeAction
  | SetMilkAction
  | SetSugarAction
  | ResetCoffeeMachineAction
  | UnsetStrengthAction
  | UnsetMilkAction

export function setBeverage(data: BeverageItem): SetBeverageAction {
  return {
    type: 'SET_BEVERAGE',
    data,
  }
}

export function setStrength(data: Strength): SetStrengthAction {
  return {
    type: 'SET_STRENGTH',
    data,
  }
}

export function setSize(data: Size): SetSizeAction {
  return {
    type: 'SET_SIZE',
    data: success(data),
  }
}

export function setMilk(data: Milk): SetMilkAction {
  return {
    type: 'SET_MILK',
    data: success(data),
  }
}

export function toggleSugar(): SetSugarAction {
  return {
    type: 'SET_SUGAR',
  }
}

export function unsetStrengthAction(): UnsetStrengthAction {
  return {
    type: 'UNSET_STRENGTH_ACTION',
  }
}

export function unsetMilkAction(): UnsetMilkAction {
  return {
    type: 'UNSET_MILK_ACTION',
  }
}

export function resetCoffeeMachine(): ResetCoffeeMachineAction {
  return {
    type: 'RESET_COFFEE_MACHINE',
  }
}
