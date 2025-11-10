
import { configureStore } from '@reduxjs/toolkit'; // On utilise configureStore car c'est le standard
import  cartReducer  from './cartSlice'; // On importe notre reducer classique

const store = configureStore({
  reducer: {
    cart: cartReducer, 
  },
});

export default store;