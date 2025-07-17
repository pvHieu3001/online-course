import { alertConstants } from '../../constants'

function success(message:string) {
  return { type: alertConstants.SUCCESS, payload: message }
}

function error(err) {
  if (typeof err === 'string') {
    return { type: alertConstants.ERROR, payload: err }
  }
  if (err.response && err.response.data && err.response.data.details) {
    const mess = err.response.data.details.map((d) => (typeof d === 'string' ? d : d.errorMessage)).join(', ')
    return { type: alertConstants.ERROR, payload: mess }
  }
  return { type: alertConstants.ERROR, payload: 'Error' }
}

function clear() {
  return { type: alertConstants.CLEAR }
}

export const alertActions = {
  success,
  error,
  clear
}
