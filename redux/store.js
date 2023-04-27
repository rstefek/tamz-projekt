import { configureStore } from '@reduxjs/toolkit'
import storesSlice from './reducers/stores'
import goodsSlice from './reducers/goods'

export const store = configureStore({
  reducer: {
    stores: storesSlice,
    goods: goodsSlice
  },
})