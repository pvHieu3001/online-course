import { errorConstants } from '../constants';

export function error(state = { unauthorized: { status: false } }, action) {
  switch (action.type) {
    case errorConstants.UNAUTHORIZED:
      return {
        ...state,
        unauthorized: { status: true }
      };
    default:
      return state;
  }
}
