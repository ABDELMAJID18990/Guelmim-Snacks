import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, AUTH_UPDATE_USER } from './authActionTypes';

// L'état initial tente de lire l'utilisateur depuis le localStorage
// C'est comme ça que la "session" persiste après un rafraîchissement
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload));
      // On retourne un NOUVEL état avec l'utilisateur
      return {
        ...state,
        user: action.payload
      };

    case AUTH_LOGOUT:
      localStorage.removeItem('user');
      return {
        ...state,
        user: null
      };
      
    case AUTH_UPDATE_USER: {
      const updatedUser = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return {
        ...state,
        user: updatedUser
      };
    }  
    default:
      return state;
  }
};