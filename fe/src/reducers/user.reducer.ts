import { userConstants } from '../constants';

export function user(
  state = {
    search: {},
    get: {},
    users: {},
    unapproves: {},
    role: {},
    create: {},
    delete: {},
    update: {},
    login: {},
    reissuePassword: {}
  },
  action
) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        search: { loading: true }
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        search: { items: action.payload }
      };
    case userConstants.GETALL_FAILURE:
      return {
        ...state,
        search: { error: action.payload }
      };
    case userConstants.GETBYID_SUCCESS:
      return {
        ...state,
        get: { item: action.payload }
      };
    case userConstants.GETBYID_FAILURE:
      return {
        ...state,
        get: { error: action.payload }
      };
    case userConstants.GETLOGGEDIN_REQUEST:
      return {
        ...state,
        userLoggedIn: { loading: true }
      };
    case userConstants.GETLOGGEDIN_SUCCESS:
      return {
        ...state,
        userLoggedIn: { items: action.payload }
      };
    case userConstants.GETLOGGEDIN_FAILURE:
      return {
        ...state,
        userLoggedIn: { error: action.payload }
      };
    case userConstants.GET_USERS_REQUEST:
      return {
        ...state,
        users: { loading: true }
      };
    case userConstants.GET_USERS_SUCCESS:
      return {
        ...state,
        users: { items: action.payload }
      };
    case userConstants.GETUSER_FAILURE:
      return {
        ...state,
        users: { error: action.payload }
      };
    case userConstants.GET_UNAPPROVE_USERS_REQUEST:
      return {
        ...state,
        unapproves: { loading: true }
      };
    case userConstants.GET_UNAPPROVE_USERS_SUCCESS:
      return {
        ...state,
        unapproves: { items: action.payload }
      };
    case userConstants.GET_UNAPPROVE_USER_FAILURE:
      return {
        ...state,
        unapproves: { error: action.payload }
      };
    case userConstants.CREATE_REQUEST:
      return {
        ...state,
        create: { loading: true }
      };
    case userConstants.CREATE_SUCCESS:
      return {
        ...state,
        create: { item: action.payload }
      };
    case userConstants.CREATE_FAILURE:
      return {
        ...state,
        create: { error: action.payload }
      };
    case userConstants.DELETE_REQUEST:
      return {
        ...state,
        delete: { loading: true }
      };
    case userConstants.DELETE_SUCCESS:
      return {
        ...state,
        delete: { item: action.payload }
      };
    case userConstants.DELETE_FAILURE:
      return {
        ...state,
        delete: { error: action.payload }
      };
    case userConstants.UPDATE_REQUEST:
      return {
        ...state,
        update: { loading: true }
      };
    case userConstants.UPDATE_SUCCESS:
      return {
        ...state,
        update: { item: action.payload }
      };
    case userConstants.UPDATE_FAILURE:
      return {
        ...state,
        update: { error: action.payload }
      };

    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        login: { loading: true }
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        login: { token: action.payload }
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        login: { error: action.payload }
      };
    case userConstants.ISSUEPASSWORD_REQUEST:
      return {
        ...state,
        reissuePassword: { loading: true }
      };
    case userConstants.ISSUEPASSWORD_SUCCESS:
      return {
        ...state,
        reissuePassword: { item: action.payload }
      };
    case userConstants.ISSUEPASSWORD_FAILURE:
      return {
        ...state,
        reissuePassword: { error: action.payload }
      };
    case userConstants.GETLOGS_REQUEST:
      return {
        ...state,
        getLogs: { loading: true }
      };
    case userConstants.GETLOGS_SUCCESS:
      return {
        ...state,
        getLogs: { item: action.payload }
      };
    case userConstants.GETLOGS_FAILURE:
      return {
        ...state,
        getLogs: { error: action.payload }
      };
    default:
      return state;
  }
}
