import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    
    addItem(state, action) {
      const item = action.payload; 
      const existingItem = state.find(i => i.id === item.id);
      
      if (existingItem) {
        existingItem.quantity += item.quantity || 1; 
      } else {
        state.push({ ...item });
      }
    },

   
    updateQuantity(state, action) {
      const { id, newQuantity } = action.payload;
      const index = state.findIndex(item => item.id === id);
      
      if (newQuantity < 1) {
        state.splice(index, 1); // Suppression avec mutation (Immer le gère)
      } else if (index !== -1) {
        state[index].quantity = newQuantity;
      }
    },

   
    removeItem(state, action) {
      const idToRemove = action.payload;
      const index = state.findIndex(item => item.id === idToRemove);
      if (index !== -1) {
        state.splice(index, 1); 
      }
    },
    
    clearCart(state) {
        return []; 
    }
  }
});


export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;