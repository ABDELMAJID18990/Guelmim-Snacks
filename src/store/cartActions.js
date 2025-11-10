// src/store/cartActions.js

import { CART_ADD_ITEM, CART_UPDATE_QUANTITY, CART_REMOVE_ITEM } from './actionTypes';

// Les "Action Creators" renvoient un objet avec un type et un payload
export const addItem = (item) => {
    return {
        type: CART_ADD_ITEM,
        payload: item // item = { id, name, price, quantity }
    };
};

export const updateQuantity = (id, newQuantity) => {
    return {
        type: CART_UPDATE_QUANTITY,
        payload: { id, newQuantity }
    };
};

export const removeItem = (id) => {
    return {
        type: CART_REMOVE_ITEM,
        payload: id
    };
};