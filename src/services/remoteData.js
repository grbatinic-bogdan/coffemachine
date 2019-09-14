const NOT_ASKED_TYPE = 'NOT_ASKED'
const PENDING_TYPE = 'PENDING'
const SUCCESS_TYPE = 'SUCCESS'
const FAILURE_TYPE = 'FAILURE'

export const notAsked = () => {
  return {
    type: NOT_ASKED_TYPE,
  }
}

export const pending = () => {
  return {
    type: PENDING_TYPE,
  }
}

export const success = data => {
  return {
    type: SUCCESS_TYPE,
    data,
  }
}

export const failure = error => {
  return {
    type: FAILURE_TYPE,
    error,
  }
}

export const isNotAsked = ({ type }) => {
  return type === NOT_ASKED_TYPE
}

export const isPending = ({ type }) => {
  return type === PENDING_TYPE
}

export const isSuccess = ({ type }) => {
  return type === SUCCESS_TYPE
}

export const isFailure = ({ type }) => {
  return type === FAILURE_TYPE
}
