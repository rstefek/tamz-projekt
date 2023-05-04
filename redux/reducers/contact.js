import { createSlice } from '@reduxjs/toolkit'
import api from '../../helpers/api';

const initialState = {
  email: "",
  name: "",
  text: "",
  apiState: 0,
}

export const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setText: (state, action) => {
      state.text = action.payload;
    },
    stateChange: (state, action) => {
      if(action.payload == 3) {
        Object.assign(state, initialState); //při úspěšném odeslání promažeme form
      }
      state.apiState = action.payload;
    },    
  },
})

// Action creators are generated for each case reducer function
export const { setEmail, setName, setText, stateChange } = contactFormSlice.actions

export const sendContactForm = (data) => async (dispatch) => {
  dispatch(stateChange(1))
  const response = await api().post('contact.php', data).catch();
  console.log(response);
  if(response.status == 200) {
    dispatch(stateChange(3))
  } else {
    dispatch(stateChange(2))
  }
}

export default contactFormSlice.reducer