import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  order: []
}

const cartSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {}
})

export default cartSlice.reducer
