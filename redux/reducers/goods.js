import { createSlice } from '@reduxjs/toolkit'
import api from '../../helpers/api';

const initialState = {
  list: [],
  loadingState: 0
}

export const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    populate: (state, action) => {
      state.list = [];
      action.payload && action.payload.map((store) => state.list.push(store));
      state.loadingState = 0;
    },
    loading: (state, stat) => {
      state.loadingState = stat;
    },
  },
})

// Action creators are generated for each case reducer function
export const { populate, loading } = goodsSlice.actions

export const populateGoods = () => async (dispatch) => {
  dispatch(loading(1))
  const response = await api().get('goods.json').catch();
  if(response.data) {
    dispatch(populate(response.data))
  } else {
    dispatch(loading(2))
  }
}

export default goodsSlice.reducer