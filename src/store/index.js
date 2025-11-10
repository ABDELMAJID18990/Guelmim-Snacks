// src/store/index.js

import { configureStore } from '@reduxjs/toolkit'; // On utilise configureStore car c'est le standard
import { cartReducer } from './cartReducer'; // On importe notre reducer classique

const store = configureStore({
  reducer: {
    cart: cartReducer, 
  },
});

export default store;