import { createSlice } from '@reduxjs/toolkit'

export interface WebState {
  miniSidenav: boolean,
  bgIcon: string,
  fixedNavbar: boolean,
  darkColor: string,
  mainColor: string,
  inActiveColor: string,
  loading: boolean,
  notification: boolean,
  backgroundColor: string,
  openModalLogin: boolean
}

const initialState: WebState = {
  bgIcon: "#e9ecef",
  darkColor: '#3a416f',
  mainColor: '#17c1e8',
  inActiveColor: 'gray-400',
  backgroundColor: 'linear-gradient(310deg, #2152ff, #21d4fd)',
  miniSidenav: false,
  fixedNavbar: true,
  loading: false,
  notification: false,
  openModalLogin: false
}

export const web = createSlice({
  name: 'web',
  initialState,
  reducers: {
    handleFixedNavbar: (state) => {
      state.fixedNavbar = !state.fixedNavbar
    },
    setVisible: (state, action) => {
      state.miniSidenav = action.payload
    },
    setMiniSidenav: (state, {payload = false}) => {
      if(payload && state.miniSidenav){
        state.miniSidenav = false

      }else if(payload == false){
        state.miniSidenav = !state.miniSidenav
      }
    },
    setNotification: (state, action) => {
      state.notification = action.payload
    },
    setLoading: (state, action) => {      
      state.loading = action.payload
    },
    setOpenModalLogin: (state, {payload}) => {
      state.openModalLogin = payload
      
    }
  }
})

export const { 
  handleFixedNavbar, 
  setVisible, 
  setMiniSidenav, 
  setNotification, 
  setLoading,
  setOpenModalLogin
} = web.actions

export default web.reducer