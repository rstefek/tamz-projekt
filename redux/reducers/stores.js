import { createSlice } from '@reduxjs/toolkit'
import api from '../../helpers/api';
import { getDistanceBetweenPoints } from '../../helpers/location';
import { getData, storeData } from '../../helpers/storage';

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
    updateDistance: (state, action) => {
        //v datech máme aktuální lokaci, spouštíme a aktualizujeme vzdálenosti v seznamu
        const distanceList = state.list.map((store) => {
          store.distance = getDistanceBetweenPoints(store.latlng.latitude, store.latlng.longitude, action.payload.latitude, action.payload.longitude);
          return store;
        });
        state.list = distanceList;
        return state;
    },
    loading: (state, action) => {
      state.loadingState = action.payload;
    },    
  },
})

// Action creators are generated for each case reducer function
export const { populate, updateDistance, loading } = storesSlice.actions

// Define a thunk that dispatches those action creators
export const populateStores = () => async (dispatch) => {
  dispatch(loading(1))
  const response = await api().get('storesx.json').catch(() => {return {}});
  if(response.data) {
    await storeData("stores", response.data); //odložíme data do storage na zařízení
    dispatch(populate(response.data))
  } else {
    const localData = await getData("stores");
    if(localData) {
      dispatch(populate(localData))
    }
    dispatch(loading(2))
  }
}

export default storesSlice.reducer