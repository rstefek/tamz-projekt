import { createSlice } from '@reduxjs/toolkit'
import api from '../../helpers/api';
import { getData, storeData } from '../../helpers/storage';

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
    loading: (state, action) => {
      state.loadingState = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { populate, loading } = goodsSlice.actions

export const populateGoods = () => async (dispatch) => {
  dispatch(loading(1))
  const response = await api().get('goods.json').catch(() => {return {}});
  if(response.data) {
    await storeData("goods", response.data); //odložíme data do storage na zařízení
    dispatch(populate(response.data))
  } else {
    const localData = await getData("goods");
    if(localData) {
      dispatch(populate(localData))
    }
    dispatch(loading(2))
  }
}

export default goodsSlice.reducer