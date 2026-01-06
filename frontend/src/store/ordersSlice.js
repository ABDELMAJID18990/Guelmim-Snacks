import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearCart } from './cartSlice';


export const placeOrder = createAsyncThunk('orders/placeOrder', async (orderData, {
    getState, rejectWithValue, dispatch }) => {
    try {
        const token = getState().auth.token;
        const response = await fetch('http://127.0.0.1:8000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Erreur commande');

        dispatch(clearCart());

        return data;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, {
    getState, rejectWithValue }) => {
    try {
        const token = getState().auth.token;

        const response = await fetch('http://127.0.0.1:8000/api/orders', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data;

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const updateOrderStatus = createAsyncThunk('orders/updateStatus', async ({
    id, status }, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.token;
        const response = await fetch(`http://127.0.0.1:8000/api/orders/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`

            },
            body: JSON.stringify({ status })

        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (orderId, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.token;

        const response = await fetch(`http://127.0.0.1:8000/api/orders/${orderId}`, {
            method: 'DELETE', // Important !
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur lors de la suppression');
        }

        return orderId; // On retourne l'ID pour pouvoir le supprimer du state local

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        list: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Place Order
            .addCase(placeOrder.pending, (state) => { state.status = 'loading'; })
            .addCase(placeOrder.fulfilled, (state) => { state.status = 'succeeded'; })
            .addCase(placeOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            //Fetch Orders
            .addCase(fetchOrders.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })

            //Update Status 
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const index = state.list.findIndex(o => o.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                // L'action.payload contient l'ID de la commande supprimée
                // On filtre la liste pour garder tout SAUF cette commande
                state.list = state.list.filter(order => order.id !== action.payload);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.error = action.payload;
            });

    }
});

export default ordersSlice.reducer;