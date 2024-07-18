import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  token: localStorage.getItem('token'),
  isLoggedIn: localStorage.getItem('token') ? true : false,
  isLoading: false,
  error: null,
};

// Async thunk action to handle login
export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/login', credentials);
      const { token } = response.data;
      localStorage.setItem('token', token); // Store token in localStorage
      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to handle email registration and get verification code
export const registerEmailAsync = createAsyncThunk(
  'auth/registerEmail',
  async (email, thunkAPI) => {
    try {
      const response = await axios.post('/auth/register/email', { email });
      // Server should respond with a verification code
      const { verificationCode } = response.data;
      return { email, verificationCode };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to handle full registration
export const registerAsync = createAsyncThunk(
  'auth/register',
  async (registrationData, thunkAPI) => {
    try {
      const response = await axios.post('/auth/register', registrationData);
      const { token } = response.data;
      localStorage.setItem('token', token); // Store token in localStorage
      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to handle logout
export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    localStorage.removeItem('token'); // Remove token on logout
    return null;
  }
);

// Create authSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || 'Login failed';
      })
      .addCase(registerEmailAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerEmailAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.registrationData = action.payload; // Store registration data (email, verification code)
      })
      .addCase(registerEmailAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || 'Email registration failed';
      })
      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || 'Registration failed';
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;

// Export async actions
export { loginAsync as login, registerEmailAsync as registerEmail, registerAsync as register, logoutAsync as logout };
