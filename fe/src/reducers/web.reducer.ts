
export interface WebState {
  miniSidenav: boolean
  bgIcon: string
  fixedNavbar: boolean
  darkColor: string
  mainColor: string
  inActiveColor: string
  loading: boolean
  notification: boolean
  backgroundColor: string
  openModalLogin: boolean
}

interface WebAction {
  type: string
  payload?: any
}

export function web(
  state: WebState = {
    bgIcon: '#e9ecef',
    darkColor: '#3a416f',
    mainColor: '#17c1e8',
    inActiveColor: 'gray-400',
    backgroundColor: 'linear-gradient(310deg, #2152ff, #21d4fd)',
    miniSidenav: false,
    fixedNavbar: true,
    loading: false,
    notification: false,
    openModalLogin: false
  },
  action: WebAction
): WebState {
  switch (action.type) {
    case 'fixnav':
      return {
        ...state,
        fixedNavbar: !state.fixedNavbar
      }
    case 'visible':
      return {
        ...state,
        miniSidenav: action.payload
      }
    case 'mininav':
      return {
        ...state,
        miniSidenav: !state.miniSidenav
      }
    case 'noti':
      return {
        ...state,
        notification: action.payload
      }
    case 'loading':
      return {
        ...state,
        loading: action.payload
      }
    case 'loginmodal':
      return {
        ...state,
        openModalLogin: action.payload
      }
    default:
      return state
  }
}
