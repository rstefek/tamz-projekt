import { createSlice } from '@reduxjs/toolkit'
import api from '../../helpers/api';

const initialState = {
  list: [],
  loadingState: 0,
}

export const storesSlice = createSlice({
  name: 'stores',
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
export const { populate, loading } = storesSlice.actions

// Define a thunk that dispatches those action creators
export const populateStores = () => async (dispatch) => {
  dispatch(loading(1))
  const response = await api().get('stores.json').catch();
  if(response.data) {
    dispatch(populate(response.data))
  } else {
    dispatch(loading(2))
  }
}

export default storesSlice.reducer