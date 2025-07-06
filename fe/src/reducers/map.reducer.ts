import { mapConstants } from "../constants";

export function map(
  state = {
    get: {},
    filter: {},
    update: {},
  },
  action
) {
  switch (action.type) {
    case mapConstants.GETALL_REQUEST:
      return {
        ...state,
      };

    case mapConstants.GETALL_SUCCESS:
      return {
        ...state,
        get: { items: action.payload },
      };

    case mapConstants.FILTER_REQUEST:
      return {
        ...state,
      };

    case mapConstants.FILTER_SUCCESS:
      return {
        ...state,
        filter: { items: action.payload },
      };
    case mapConstants.UPDATE_PIN_REQUEST:
      return {
        ...state,
        update: { loading: true },
      };
    case mapConstants.UPDATE_PIN_SUCCESS:
      return {
        ...state,
        update: { item: action.payload },
      };
    case mapConstants.UPDATE_PIN_FAILURE:
      return {
        ...state,
        update: { error: action.payload },
      };
    default:
      return state;
  }
}
