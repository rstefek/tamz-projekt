import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [{code: "8594006825511", name: "Prolinie limetka 1,5L", price: 18}],
}

export const goodsSlice = createSlice({
  name: 'goods',
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
export const { addToList } = goodsSlice.actions

export default goodsSlice.reducer