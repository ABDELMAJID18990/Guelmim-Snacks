// src/store/authActions.js

import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, AUTH_UPDATE_USER } from './authActionTypes';

// L'action de connexion reçoit les données de l'utilisateur en payload
export const loginSuccess = (userData) => {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: userData
  };
};

// L'action de déconnexion n'a pas besoin de payload
export const logout = () => {
  return {
    type: AUTH_LOGOUT
  };
};

export const updateUser = (updatedUserData) => {
  return {
    type: AUTH_UPDATE_USER,
    payload: updatedUserData // Ce seront les nouvelles informations
  };
};