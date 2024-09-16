import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Google auth

//http://139.59.4.99:3000/api/auth/google



// Define initial state
const initialState = {
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')) || null, // Ensure user is set
  accessToken: localStorage.getItem('token'),
  isLoggedIn: !!localStorage.getItem('token'), // Check if token exists
  isLoading: false,
  error: null,
};


const baseURL = 'http://139.59.4.99:3000/api/auth';
//const baseURL = 'http://localhost:3000/api/auth';

// Async thunk action to handle login
// Async thunk action to handle login
export const loginAsync = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(baseURL + '/login', {
        email,
        password,
      });
      const { tokens, user } = response.data;
      const token = tokens.access.token;
      
      // Store token and user in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { token, user }; // Return both token and user
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


// Async thunk action to handle email registration and get verification code
// export const registerEmailAsync = createAsyncThunk(
//   'auth/registerEmail',
//   async (email, thunkAPI) => {
//     try {
//       const response = await axios.post('/auth/register/email', { email });
//       // Server should respond with a verification code
//       const { verificationCode } = response.data;
//       return { email, verificationCode };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );



// Async thunk action to handle full registration
export const registerAsync = createAsyncThunk(
  'auth/register',
  async ({ registrationData }, thunkAPI) => {
    try {
      const response = await axios.post(baseURL + '/', {
        email: registrationData.email,
        password: registrationData.password,
        firstName: registrationData.firstName,
        lastName: registrationData.lastName,
        companyName: registrationData.companyName,
      });
      console.log(response.data);
      const { tokens, user } = response.data;
      const token = tokens.access.token;

      // Store token and user in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { token, user }; // Return both token and user
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to handle email registration and get verification code
export const codeVerifyAsync = createAsyncThunk(
    'auth/verification',
    async (value, thunkAPI) => {
      try {
        // Retrieve token from localStorage
      const token = localStorage.getItem('token');
      // Set up the request headers with the token
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
        const response = await axios.post(baseURL+'/verification',
             {"verificationCode": value.newValue}, config);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

// Async thunk action to handle logout
// export const logoutAsync = createAsyncThunk(
//   'auth/logout',
//   async (_, thunkAPI) => {
//     localStorage.removeItem('token'); // Remove token on logout
//     return null;
//   }
// );

// Create authSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // Remove user data as well
      state.token = null;
      state.accessToken = null;
      state.user = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
    },
    rehydrateToken: (state) => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user')); // Retrieve user from localStorage
      if (token) {
        state.token = token;
        state.user = user;
        state.isLoggedIn = true;
      }
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
      // .addCase(registerEmailAsync.pending, (state) => {
      //   state.isLoading = true;
      //   state.error = null;
      // })
      // .addCase(registerEmailAsync.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.error = null;
      //   state.registrationData = action.payload; // Store registration data (email, verification code)
      // })
      // .addCase(registerEmailAsync.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload || 'Email registration failed';
      // })
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
        //state.token = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(codeVerifyAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || 'Verification failed';
      })
      // .addCase(logoutAsync.fulfilled, (state) => {
      //   state.token = null;
      //   state.isLoggedIn = false;
      //   state.isLoading = false;
      //   state.error = null;
      // });
  },
});

export default authSlice.reducer;

//export const { rehydrateToken } = authSlice.actions;
// Export async actions
export const { logout, rehydrateToken } = authSlice.actions;
export { loginAsync as login, registerAsync as register, codeVerifyAsync as verify };
//export const selectAccessToken = (state) => state.auth.token;