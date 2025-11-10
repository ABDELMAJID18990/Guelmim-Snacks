import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    // Ajouter ou incrémenter (la mutation directe est PERMISE grâce à Immer)
    addItem(state, action) {
      const item = action.payload; // item = { id, name, price, quantity: 1 }
      const existingItem = state.find(i => i.id === item.id);
      
      if (existingItem) {
        existingItem.quantity += item.quantity || 1; // MODIFICATION DIRECTE DE L'ÉTAT
      } else {
        state.push({ ...item }); // MODIFICATION DIRECTE DE L'ÉTAT
      }
    },

    // Mettre à jour (Utilisé par la CartPage pour +/-)
    updateQuantity(state, action) {
      const { id, newQuantity } = action.payload;
      const index = state.findIndex(item => item.id === id);
      
      if (newQuantity < 1) {
        state.splice(index, 1); // Suppression avec mutation (Immer le gère)
      } else if (index !== -1) {
        state[index].quantity = newQuantity; // Modification de la quantité
      }
    },

    // Supprimer
    removeItem(state, action) {
      const idToRemove = action.payload;
      const index = state.findIndex(item => item.id === idToRemove);
      if (index !== -1) {
        state.splice(index, 1); // Suppression directe avec mutation
      }
    },
    
    clearCart(state) {
        return []; // Un simple retour écrase l'état (comme en Redux classique)
    }
  }
});

// Exporte le créateur d'action généré par createSlice
export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;