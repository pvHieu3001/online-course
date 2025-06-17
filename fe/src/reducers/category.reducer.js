import { categoryConstants } from "../constants";

export function category(
  state = {
    getBigCategory: {},
    getMediumCategory: {},
    getDetailCategory: {}
  },
  action
) {
  switch (action.type) {
    case categoryConstants.GETBIG_REQUEST:
      return {
        ...state,
        getBigCategory: { loading: true },
      };
    case categoryConstants.GETBIG_SUCCESS:
      return {
        ...state,
        getBigCategory: { items: action.payload.data },
      };
    case categoryConstants.GETBIG_FAILURE:
      return {
        ...state,
        getBigCategory: { error: action.payload },
      };
    case categoryConstants.GETMED_REQUEST:
      return {
        ...state,
        getMediumCategory: { loading: true },
      };
    case categoryConstants.GETMED_SUCCESS:
      return {
        ...state,
        getMediumCategory: { items: action.payload.data },
      };
    case categoryConstants.GETMED_FAILURE:
      return {
        ...state,
        getMediumCategory: { error: action.payload },
      };
    case categoryConstants.GETDET_REQUEST:
      return {
        ...state,
        getDetailCategory: { loading: true },
      };
    case categoryConstants.GETDET_SUCCESS:
      return {
        ...state,
        getDetailCategory: { items: action.payload.data },
      };
    case categoryConstants.GETDET_FAILURE:
      return {
        ...state,
        getDetailCategory: { error: action.payload },
      };
    default:
      return state;
  }
}
