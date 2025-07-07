import {adminConstants } from "../constants";

export function admin(
  state = {
    get: {},
    update:{}
  },
  action
) {
  switch (action.type) {
    case adminConstants.UPDATE_REQUEST:
      return {
        ...state,
        update: { loading: true },
      };
    case adminConstants.UPDATE_SUCCESS:
      return {
        ...state,
        update: { item: action.payload },
      };
    case adminConstants.UPDATE_FAILURE:
      return {
        ...state,
        update: { error: action.payload },
      };
    case adminConstants.GETBYID_REQUEST:
      return {
        ...state,
        get: { loading: true },
      };
    case adminConstants.GETBYID_SUCCESS:
      return {
        ...state,
        get: { item: action.payload.data },
      };
    case adminConstants.GETBYID_FAILURE:
      return {
        ...state,
        get: { error: action.payload },
      };
    default:
      return state;
  }
}
