import { configureStore } from '@reduxjs/toolkit'
import storesSlice from './reducers/stores'
import goodsSlice from './reducers/goods'
import contactFormSlice from './reducers/contact'

export const store = configureStore({
  reducer: {
    stores: storesSlice,
    goods: goodsSlice,
    contactForm: contactFormSlice
  },
})