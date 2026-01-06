import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; 
import authReducer from './authSlice'; 
import productsReducer from './productsSlice'; 
import ordersReducer from './ordersSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer, 
    products : productsReducer,
    orders : ordersReducer
  },
});

export default store;