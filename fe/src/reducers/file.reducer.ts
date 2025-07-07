import { fileConstants } from "../constants";

export function file(
  state = {
    get: {},
  },
  action
) {
  switch (action.type) {
    case fileConstants.GETALL_REQUEST:
      return {
        ...state,
        get: { loading: true },
      };
    case fileConstants.GETALL_SUCCESS:
      return {
        ...state,
        get: { items: action.payload.data },
      };
    case fileConstants.GETALL_FAILURE:
      return {
        ...state,
        get: { error: action.payload },
      };
    default:
      return state;
  }
}
