// src/store/authSlice.js (Version RTK)

import { createSlice } from '@reduxjs/toolkit';

// L'état initial est le même, on charge depuis le localStorage
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

// CRÉATION DU SLICE
const authSlice = createSlice({
  name: 'auth',
  initialState,
  // La section "reducers" remplace à la fois les action creators et le switch/case
  reducers: {
    // La clé de la fonction devient le nom de l'action : 'auth/login'
    login(state, action) {
      // Grâce à Immer (inclus dans RTK), ON PEUT MUTTER l'état directement !
      state.user = action.payload;
      // On continue de synchroniser le localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
    },

    // Action : 'auth/updateUser'
    updateUser(state, action) {
      // On mute directement en fusionnant les nouvelles données
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    
    // Action : 'auth/logout'
    logout(state) {
      // On mute directement en mettant à null
      state.user = null;
      localStorage.removeItem('user');
    }
  }
});

// `createSlice` génère automatiquement les action creators pour nous
export const { login, updateUser, logout } = authSlice.actions;

// On exporte le reducer qui sera utilisé par le store principal
export default authSlice.reducer;