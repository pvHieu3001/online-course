export const handleFixedNavbar = (payload) => async (dispatch) =>{
  dispatch({type: "fixnav", payload: payload})
}
export const setVisible = ( payload) => async (dispatch) => {
  dispatch({type: "visible", payload: payload})
}
export const setMiniSidenav = (payload) => async (dispatch) =>{
  dispatch({type: "mininav", payload: payload})
}
export const setNotification = (payload) => async (dispatch) =>{
  dispatch({type: "noti", payload: payload})
}
export const setLoading = ( payload) => async (dispatch)=> {
  dispatch({type: "loading", payload: payload})
}
export const setOpenModalLogin = (payload) => async (dispatch) =>{
  dispatch({type: "loginmodal", payload: payload})
}

export const webActions = {
  handleFixedNavbar,
  setVisible,
  setMiniSidenav,
  setNotification,
  setLoading,
  setOpenModalLogin,
};