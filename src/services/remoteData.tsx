export type IRemoteDataType = 'NOT_ASKED' | 'PENDING' | 'SUCCESS' | 'FAILURE'

interface RemoteDataNotAsked {
  type: 'NOT_ASKED'
}
interface RemoteDataPending {
  type: 'PENDING'
}
interface RemoteDataSuccess<T> {
  type: 'SUCCESS'
  data: T
}
interface RemoteDataFailure<E> {
  type: 'FAILURE'
  error: E
}

export type IRemoteData<T, E> =
  | RemoteDataNotAsked
  | RemoteDataPending
  | RemoteDataSuccess<T>
  | RemoteDataFailure<E>

export const notAsked = (): RemoteDataNotAsked => {
  return {
    type: 'NOT_ASKED',
  }
}

export const pending = (): RemoteDataPending => {
  return {
    type: 'PENDING',
  }
}

export function success<T>(data: T): RemoteDataSuccess<T> {
  return {
    type: 'SUCCESS',
    data,
  }
}

export function failure<T>(error: T): RemoteDataFailure<T> {
  return {
    type: 'FAILURE',
    error,
  }
}

export const isNotAsked = <T, E>(
  remoteData: IRemoteData<T, E>,
): remoteData is RemoteDataNotAsked => {
  return remoteData.type === 'NOT_ASKED'
}

export const isPending = <T, E>(remoteData: IRemoteData<T, E>): remoteData is RemoteDataPending => {
  return remoteData.type === 'PENDING'
}

export const isSuccess = <T, E>(
  remoteData: IRemoteData<T, E>,
): remoteData is RemoteDataSuccess<T> => {
  return remoteData.type === 'SUCCESS'
}

export const isFailure = <T, E>(
  remoteData: IRemoteData<T, E>,
): remoteData is RemoteDataFailure<E> => {
  return remoteData.type === 'FAILURE'
}

export const getRemoteDataState = <T, E>(remoteData: IRemoteData<T, E>): IRemoteDataType => {
  return remoteData.type
}
