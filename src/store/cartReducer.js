import { CART_ADD_ITEM, CART_UPDATE_QUANTITY, CART_REMOVE_ITEM } from './actionTypes';

const initialState = [];

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_ADD_ITEM: {
            const item = action.payload;
            const quantity = item.quantity || 1;
            const existingItem = state.find(i => i.id === item.id);

            // Logique complexe avec immutabilité
            if (existingItem) {
                return state.map(i => 
                    i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
                );
            } else {
                return [...state, { ...item, quantity }];
            }
        }

        case CART_UPDATE_QUANTITY: {
            const { id, newQuantity } = action.payload;
            // Le Redux classique nécessite des copies
            return state.map(item => 
                item.id === id ? { ...item, quantity: newQuantity } : item
            ).filter(item => item.quantity > 0); // Filtre pour supprimer si < 1
        }

        case CART_REMOVE_ITEM: {
            return state.filter(item => item.id !== action.payload);
        }

        default:
            return state;
    }
};