// src/store/index.js

import { configureStore } from '@reduxjs/toolkit'; // On utilise configureStore car c'est le standard
import { cartReducer } from './cartReducer'; 
import { authReducer } from './authReducer';

const store = configureStore({
  reducer: {
    cart: cartReducer, 
    auth: authReducer,
  },
});

export default store;