import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/axios';

// Define initial state
const initialState = {
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')) || null,
  accessToken: localStorage.getItem('token'),
  isLoggedIn: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,
};

const baseURL = '/auth';

// Async thunk action to handle Google OAuth login
export const googleOAuthLoginAsync = createAsyncThunk(
  'auth/googleLogin',
  async ({ accessToken, navigate, refreshToken }, thunkAPI) => {
    try {
      // Save tokens in localStorage
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Hit the API with the access token
      const response = await apiClient.post('/auth/get-user-from-token', {});

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
      const response = await apiClient.post(`${baseURL}/login`, {
        email,
        password,
      });
      const { tokens, user } = response.data;
      const token = tokens.access.token;
      const refreshToken = tokens.refresh.token;

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      return { token, refreshToken, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to handle login
export const getUserAsync = createAsyncThunk(
  'auth/getUser',
  async (userId, thunkAPI) => {
    try {
      const response = await apiClient.get(`${baseURL}/users/${userId}`);
      const user = response.data;
      // Store token and user in localStorage
      localStorage.setItem('user', JSON.stringify(user));

      return { user };
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
      const response = await apiClient.post(`${baseURL}/`, {
        email: registrationData.email,
        password: registrationData.password,
        firstName: registrationData.firstName,
        lastName: registrationData.lastName,
        companyName: registrationData.companyName,
      });

      const { tokens, user } = response.data;
      const token = tokens.access.token;
      const refreshToken = tokens.refresh.token;

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      return { token, refreshToken, user };
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
      const response = await apiClient.post(
        `${baseURL}/verification`,
        { verificationCode: value.code },
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to resend email verification code
export const resentVerificationCodeAsync = createAsyncThunk(
  'auth/email/send-verification',
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.post(
        `${baseURL}/email/send-verification`,
        {},
      );
      return response.data;
    } catch (error) {
      // Handle errors gracefully
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Failed to resend verification code' // Provide a default error message
      );
    }
  }
);

// Async thunk action to resend email verification code
export const forgetPasswordGetCodeAsync = createAsyncThunk(
  'auth/forgot/password',
  async (email, thunkAPI) => {
    try {
      const response = await apiClient.post(
        `${baseURL}/forgot/password`,
        { email },
      );
      return response.data;
    } catch (error) {
      // Handle errors gracefully
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Failed to resend verification code' // Provide a default error message
      );
    }
  }
);

export const ResetforgetPasswordWithCodeAsync = createAsyncThunk(
  'auth/reset/password',
  async ({ email, OTP, newPassword }, thunkAPI) => {
    try {
      const response = await apiClient.post(
        `${baseURL}/reset/password`,
        { email, OTP, newPassword },
      );
      return response.data;
    } catch (error) {
      // Handle errors gracefully
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Failed to resend verification code' // Provide a default error message
      );
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
    updateUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    }
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
      .addCase(codeVerifyAsync.fulfilled, (state) => {
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
export const { logout, rehydrateToken, resetError, resetLoading, updateUser } =
  authSlice.actions;
export {
  loginAsync as login,
  getUserAsync as getUser,
  registerAsync as register,
  codeVerifyAsync as verify,
  resentVerificationCodeAsync as resendVerification,
  forgetPasswordGetCodeAsync as forgetPasswordGetCode,
  ResetforgetPasswordWithCodeAsync as ResetforgetPasswordWithCode,
  googleOAuthLoginAsync as googleLogin,
};
