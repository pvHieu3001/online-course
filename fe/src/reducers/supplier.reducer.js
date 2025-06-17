import { supplierConstants } from "../constants";
import { file } from "./file.reducer";

export function supplier(
  state = {
    search: {},
    suppliers: {},
    create: {},
    update: {},
    get: {},
    delete: {},
    upload: {},
    files: {},
    suppliersList: {},
  },
  action
) {
  switch (action.type) {
    case supplierConstants.GETALL_REQUEST:
      return {
        ...state,
        search: { loading: true },
      };
    case supplierConstants.GETALL_SUCCESS:
      return {
        ...state,
        search: { items: action.payload },
      };
    case supplierConstants.GETALL_FAILURE:
      return {
        ...state,
        search: { error: action.payload },
      };
    case supplierConstants.GET_SUPPLIERS_REQUEST:
      return {
        ...state,
        suppliers: { items: action.payload, loading: true },
      };
    case supplierConstants.GET_SUPPLIERS_SUCCESS:
      return {
        ...state,
        suppliers: { items: action.payload.data },
      };
    case supplierConstants.GET_SUPPLIERS_FAILURE:
      return {
        ...state,
        suppliers: { error: action.payload },
      };
    case supplierConstants.CREATE_REQUEST:
      return {
        ...state,
        create: { loading: true },
      };
    case supplierConstants.CREATE_SUCCESS:
      return {
        ...state,
        create: { item: action.payload },
      };
    case supplierConstants.CREATE_FAILURE:
      return {
        ...state,
        create: { error: action.payload },
      };
    case supplierConstants.UPDATE_REQUEST:
      return {
        ...state,
        update: { loading: true },
      };
    case supplierConstants.UPDATE_SUCCESS:
      return {
        ...state,
        update: { item: action.payload },
      };
    case supplierConstants.UPDATE_FAILURE:
      return {
        ...state,
        update: { error: action.payload },
      };
    case supplierConstants.GETBYID_REQUEST:
      return {
        ...state,
        get: { loading: true },
      };
    case supplierConstants.GETBYID_SUCCESS:
      return {
        ...state,
        get: { item: action.payload.data },
      };
    case supplierConstants.GETBYID_FAILURE:
      return {
        ...state,
        get: { error: action.payload },
      };
    case supplierConstants.DELETE_REQUEST:
      return {
        ...state,
        delete: { loading: true },
      };
    case supplierConstants.DELETE_SUCCESS:
      return {
        ...state,
        delete: { item: action.payload },
      };
    case supplierConstants.DELETE_FAILURE:
      return {
        ...state,
        delete: { error: action.payload },
      };
    case supplierConstants.UPLOAD_SUCCESS:
      return {
        ...state,
        upload: { item: action.payload },
      };
    case supplierConstants.GET_UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        files: { item: action.payload.data },
      };
    case supplierConstants.GET_LIST_SUPPLIERS_REQUEST:
      return {
        ...state,
        suppliersList: { loading: true },
      };
    case supplierConstants.GET_LIST_SUPPLIERS_SUCCESS:
      return {
        ...state,
        suppliersList: { items: action.payload },
      };
    case supplierConstants.GET_LIST_SUPPLIERS_FAILURE:
      return {
        ...state,
        suppliersList: { error: action.payload },
      };
    default:
      return state;
  }
}
