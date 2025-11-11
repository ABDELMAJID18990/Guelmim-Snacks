import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, AUTH_UPDATE_USER } from './authActionTypes';

// L'état initial tente de lire l'utilisateur depuis le localStorage
// C'est comme ça que la "session" persiste après un rafraîchissement
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      // On sauvegarde l'utilisateur dans le localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
      // On retourne un NOUVEL état avec l'utilisateur
      return {
        ...state,
        user: action.payload
      };

    case AUTH_LOGOUT:
      // On retire l'utilisateur du localStorage
      localStorage.removeItem('user');
      // On retourne un NOUVEL état avec l'utilisateur à null
      return {
        ...state,
        user: null
      };
      
    case AUTH_UPDATE_USER: {
      // On fusionne l'ancien état utilisateur avec les nouvelles données
      const updatedUser = { ...state.user, ...action.payload };
      // On met à jour le localStorage ET l'état
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