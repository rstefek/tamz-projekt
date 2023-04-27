import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [{latlng: {latitude: 49.8271047, longitude: 18.2458972}, title: "Ostrava", description: "Duhová 5"}],
}

export const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    addToList: (state, action) => {
        state.list.push(action.payload);
    },
    /*
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },*/
  },
})

// Action creators are generated for each case reducer function
export const { addToList } = storesSlice.actions

export default storesSlice.reducer