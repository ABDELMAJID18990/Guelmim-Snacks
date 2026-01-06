import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';


export const fetchSnacks = createAsyncThunk(
    'products/fetchSnacks',
    async () => {
        const response = await fetch('http://127.0.0.1:8000/api/snacks');

        if (!response.ok) {
            throw new Error('Erreur réseau : Impossible de contacter le serveur Laravel')
        }
        return await response.json();
    }
);

export const fetchMenu = createAsyncThunk('products/fetchMenu', async () => {
    const response = await fetch('http://127.0.0.1:8000/api/menu');
    if (!response.ok) throw new Error('Erreur réseau');
    return await response.json();
});

export const fetchSnackDetails = createAsyncThunk('products/fetchSnackDetails', async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/snack/${id}`);
    if (!response.ok) throw new Error('Restaurant introuvable');
    return await response.json();
});


export const addDish = createAsyncThunk('products/addDish', async (dishData, {
    getState, rejectWithValue }) => {
    try {
        const token = getState().auth.token;

        const response = await fetch('http://127.0.0.1:8000/api/dishes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dishData)
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Erreur ajout');
        return data;

    } catch (error) {
        return rejectWithValue(error.message);

    }
});

export const updateDish = createAsyncThunk('products/updateDish', async (dishData,
    { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.token;

        const response = await fetch(`http://127.0.0.1:8000/api/dishes/${dishData.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(dishData)
            });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Erreur lors de la modification');

        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
}
)

export const deleteDish = createAsyncThunk('products/deleteDish', async (dishId, {
    getState, rejectWithValue }) => {
    try {
        const token = getState().auth.token;
        const response = await fetch(`http://127.0.0.1:8000/api/dishes/${dishId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Erreur lors de la suppression');
        return dishId;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchMyRestaurant = createAsyncThunk('products/fetchMyRestaurant',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;


            const response = await fetch('http://127.0.0.1:8000/api/my-restaurant', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();


            if (!response.ok) throw new Error(data.message || 'Erreur chargement');
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });

export const completeSetup = createAsyncThunk('products/completeSetup', async (
    formData, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.token;


        const response = await fetch('http://127.0.0.1:8000/api/restaurant/setup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Erreur lors de la configuration');

        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const updateRestaurantSettings = createAsyncThunk('products/updateSettings',
    async (formData, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;



            const response = await fetch('http://127.0.0.1:8000/api/restaurant/update', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });





const productsSlice = createSlice({
    name: 'products',
    initialState: {
        snacks: [],
        menu: [],
        currentSnack: null,
        myRestaurant: null,
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchSnacks.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchSnacks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.snacks = action.payload;
            })
            .addCase(fetchSnacks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(fetchMenu.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchMenu.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.menu = action.payload;
            })
            .addCase(fetchMenu.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(fetchSnackDetails.pending, (state) => {
                state.status = 'loading';
                state.currentSnack = null;
            })
            .addCase(fetchSnackDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentSnack = action.payload;
            })
            .addCase(fetchSnackDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(fetchMyRestaurant.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMyRestaurant.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.myRestaurant = action.payload;
            })
            .addCase(fetchMyRestaurant.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(addDish.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addDish.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Optionnel : Si vous ne rechargiez pas la liste, vous pourriez l'ajouter ici :
                // if (state.myRestaurant) state.myRestaurant.dishes.push(action.payload);
            })
            .addCase(addDish.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(updateDish.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateDish.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Optionnel : Mise à jour locale optimiste
                // const index = state.myRestaurant.dishes.findIndex(d => d.id === action.payload.id);
                // if (index !== -1) state.myRestaurant.dishes[index] = action.payload;
            })
            .addCase(updateDish.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteDish.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteDish.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Optionnel : Suppression locale
                // state.myRestaurant.dishes = state.myRestaurant.dishes.filter(d => d.id !== action.payload);
            })
            .addCase(deleteDish.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Cas pour completeSetup
            .addCase(completeSetup.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(completeSetup.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(completeSetup.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateRestaurantSettings.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateRestaurantSettings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload.restaurant) {
                    state.myRestaurant = {
                        ...state.myRestaurant,
                        ...action.payload.restaurant
                    };
                }
            })
            .addCase(updateRestaurantSettings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            ;
    }

})

export default productsSlice.reducer;