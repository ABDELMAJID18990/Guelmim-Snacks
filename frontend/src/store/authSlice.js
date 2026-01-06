import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';


export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, {
  rejectWithValue }) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.message || 'Erreur de connexion');
    }

    return data;
  }
  catch (error) {
    return rejectWithValue(error.message);
  }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (userData,
  { rejectWithValue }) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || 'Erreur lors de l\'inscription';
      return rejectWithValue(errorMessage);
    }

    return data;


  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const registerPartner = createAsyncThunk('auth/registerPartner', async (partnerData, { rejectWithValue }) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/register-partner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(partnerData)
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || 'Erreur lors de l\'inscription partenaire';
      return rejectWithValue(errorMessage);
    }

    return data; // Contient { user, token, restaurant }

  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const changeUserPassword = createAsyncThunk('auth/changePassword', async (
  passwordData, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const response = await fetch('http://127.0.0.1:8000/api/user/password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(passwordData)

    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erreur changement mot de passe');
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});



const storedUser = JSON.parse(localStorage.getItem('user'));
const storedToken = localStorage.getItem('token');

const initialState = {
  user: storedUser || null,
  token: storedToken || null,
  status: 'idle',
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },

    updateUser(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },

    logout(state) {
      state.user = null;
      state.token = null;
      state.status = null;
      state.error = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      // --- LOGIN ---
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // --- REGISTER ---

      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);

      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // --- REGISTER PARTNER ---
      .addCase(registerPartner.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerPartner.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(registerPartner.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // --- CHANGEMENT DE MOT DE PASSE ---
      .addCase(changeUserPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(changeUserPassword.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; 
      });
      


  }
});

export const { logout, updateUser } = authSlice.actions;
export default authSlice.reducer;