import { notificationConstants } from "../constants";

export function notification(
  state = {
    getAll: {},
    create: {},
    publish: {},
    getById: {},
    update: {}
  },
  action
) {
  switch (action.type) {
    case notificationConstants.GETALL_REQUEST:
      return {
        ...state,
        getAll: { loading: true },
      };
    case notificationConstants.GETALL_SUCCESS:
      return {
        ...state,
        getAll: { items: action.payload.data },
      };
    case notificationConstants.GETALL_FAILURE:
      return {
        ...state,
        getAll: { error: action.payload },
      };
    case notificationConstants.CREATE_REQUEST:
      return {
        ...state,
        create: { loading: true },
      };
    case notificationConstants.CREATE_SUCCESS:
      return {
        ...state,
        create: { items: action.payload.data },
      };
    case notificationConstants.CREATE_FAILURE:
      return {
        ...state,
        create: { error: action.payload },
      };
    case notificationConstants.PUBLISH_REQUEST:
      return {
        ...state,
        create: { loading: true },
      };
    case notificationConstants.PUBLISH_SUCCESS:
      return {
        ...state,
        create: { items: action.payload.data },
      };
    case notificationConstants.PUBLISH_FAILURE:
      return {
        ...state,
        create: { error: action.payload },
      };
    case notificationConstants.GETBYID_REQUEST:
      return {
        ...state,
        getById: { loading: true },
      };
    case notificationConstants.GETBYID_SUCCESS:
      return {
        ...state,
        getById: { item: action.payload.data },
      };
    case notificationConstants.GETBYID_FAILURE:
      return {
        ...state,
        getById: { error: action.payload },
      };
    case notificationConstants.UPDATE_REQUEST:
      return {
        ...state,
        update: { loading: true },
      };
    case notificationConstants.UPDATE_SUCCESS:
      return {
        ...state,
        update: { item: action.payload.data },
      };
    case notificationConstants.UPDATE_FAILURE:
      return {
        ...state,
        update: { error: action.payload },
      };
    default:
      return state;
  }
}
