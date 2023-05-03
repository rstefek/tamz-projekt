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
  },
})

// Action creators are generated for each case reducer function
export const { addToList } = goodsSlice.actions

export default goodsSlice.reducer