import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config/config';

// Define initial state
const initialState = {
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')) || null,
  accessToken: localStorage.getItem('token'),
  isLoggedIn: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,
};

const baseURL = `${config.apiURL}/auth`; // Change this as per your API

// Async thunk action to handle Google OAuth login
export const googleOAuthLoginAsync = createAsyncThunk(
  'auth/googleLogin',
  async ({ accessToken, navigate, refreshToken }, thunkAPI) => {
    try {
      // Save tokens in localStorage
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Hit the API with the access token
      const response = await axios.post(
        `${config.apiURL}/auth/get-user-from-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const user = response.data;
      // Save user in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');

      return { accessToken, refreshToken, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to handle login
export const loginAsync = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${baseURL}/login`, {
        email,
        password,
      });
      const { tokens, user } = response.data;
      const token = tokens.access.token;

      // Store token and user in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { token, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to handle full registration
export const registerAsync = createAsyncThunk(
  'auth/register',
  async ({ registrationData }, thunkAPI) => {
    try {
      const response = await axios.post(`${baseURL}/`, {
        email: registrationData.email,
        password: registrationData.password,
        firstName: registrationData.firstName,
        lastName: registrationData.lastName,
        companyName: registrationData.companyName,
      });

      const { tokens, user } = response.data;
      const token = tokens.access.token;

      // Store token and user in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { token, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to handle email verification code
export const codeVerifyAsync = createAsyncThunk(
  'auth/verification',
  async (value, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${baseURL}/verification`,
        {
          verificationCode: value.code,
        },
        config
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create authSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
      state.token = null;
      state.accessToken = null;
      state.user = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
    },
    rehydrateToken: (state) => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      if (token) {
        state.token = token;
        state.user = user;
        state.isLoggedIn = true;
      }
    },
    resetError: (state) => {
      state.error = null; // Reset error to null
    },
    resetLoading: (state) => {
      state.isLoggedIn = false; // Reset error to null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || 'Login failed';
      })
      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || 'Registration failed';
      })
      .addCase(codeVerifyAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(codeVerifyAsync.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(codeVerifyAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || 'Verification failed';
      })
      .addCase(googleOAuthLoginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleOAuthLoginAsync.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(googleOAuthLoginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || 'Google OAuth login failed';
      });
  },
});

export default authSlice.reducer;

// Export async actions
export const { logout, rehydrateToken, resetError, resetLoading } = authSlice.actions;
export {
  loginAsync as login,
  registerAsync as register,
  codeVerifyAsync as verify,
  googleOAuthLoginAsync as googleLogin,
};
