// const NOT_ASKED_TYPE = 'NOT_ASKED'
// const PENDING_TYPE = 'PENDING'
// const SUCCESS_TYPE = 'SUCCESS'
// const FAILURE_TYPE = 'FAILURE'

export type IRemoteDataType = 'NOT_ASKED' | 'PENDING' | 'SUCCESS' | 'FAILURE'

interface IRemoteDataNotAsked {
  type: 'NOT_ASKED'
}
interface IRemoteDataPending {
  type: 'PENDING'
}
interface IRemoteDataSuccess<T> {
  type: 'SUCCESS'
  data: T
}
interface IRemoteDataFailure<E> {
  type: 'FAILURE'
  error: E
}

export type IRemoteData<T, E> =
  | IRemoteDataNotAsked
  | IRemoteDataPending
  | IRemoteDataSuccess<T>
  | IRemoteDataFailure<E>

export const notAsked = (): IRemoteDataNotAsked => {
  return {
    type: 'NOT_ASKED',
  }
}

export const pending = (): IRemoteDataPending => {
  return {
    type: 'PENDING',
  }
}

export function success<T>(data: T): IRemoteDataSuccess<T> {
  return {
    type: 'SUCCESS',
    data,
  }
}

export function failure<T>(error: T): IRemoteDataFailure<T> {
  return {
    type: 'FAILURE',
    error,
  }
}

export const isNotAsked = <T, E>(
  remoteData: IRemoteData<T, E>,
): remoteData is IRemoteDataNotAsked => {
  return remoteData.type === 'NOT_ASKED'
}

export const isPending = <T, E>(
  remoteData: IRemoteData<T, E>,
): remoteData is IRemoteDataPending => {
  return remoteData.type === 'PENDING'
}

export const isSuccess = <T, E>(
  remoteData: IRemoteData<T, E>,
): remoteData is IRemoteDataSuccess<T> => {
  return remoteData.type === 'SUCCESS'
}

export const isFailure = <T, E>(
  remoteData: IRemoteData<T, E>,
): remoteData is IRemoteDataFailure<E> => {
  return remoteData.type === 'FAILURE'
}

export const getRemoteDataState = <T, E>(remoteData: IRemoteData<T, E>): IRemoteDataType => {
  return remoteData.type
}
