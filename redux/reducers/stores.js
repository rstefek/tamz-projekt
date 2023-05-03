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
        action.payload && action.payload.map((store) => state.list.push(store));
        state.loading = 0;
    },
    loading: (state, stat) => {
      state.loading = stat;
    },    
  },
})

// Action creators are generated for each case reducer function
export const { populate, loading } = storesSlice.actions

// Define a thunk that dispatches those action creators
export const populateStores = () => async (dispatch) => {
  dispatch(loading(1))
  console.log("Loading...");
  const response = await api().get('stores.json');
  console.log(response);
  dispatch(populate(response.data))
}

export default storesSlice.reducer