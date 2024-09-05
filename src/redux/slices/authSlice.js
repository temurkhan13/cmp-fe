import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Define initial state
const initialState = {
  token: localStorage.getItem('token'),
  accessToken: localStorage.getItem('token'),
  isLoggedIn: localStorage.getItem('token') ? true : false,
  isLoading: false,
  error: null,
};


const baseURL = 'http://139.59.4.99:3000/api/auth';
//const baseURL = 'http://localhost:3000/api/auth';

// Async thunk action to handle login
export const loginAsync = createAsyncThunk(
  'auth/login',
  async ({email,password}, thunkAPI) => {
    try {
      console.log('token '+ email);
      const response = await axios.post(baseURL+'/login', {
        email,
        password,
      });
        const  token  = response.data.tokens.access.token;
        console.log('token response '+ token);
        
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
  async ({registrationData, password}, thunkAPI) => {
    try {
      const response = await axios.post(baseURL+'/', {
        email: registrationData.email,
        password: password,
        firstName: registrationData.name,
        lastName: registrationData.lastName,
        industry: registrationData.industry,
        companyName: registrationData.companyName,
        companySize: registrationData.companySize,
        webURL: registrationData.websiteURL,
        jobTitle: registrationData.jobTitle,

      });
      console.log(response); // Log the entire response object
      console.log(response.data); // Log the data part of the response
      const  token  = response.data.tokens.access.token;
      console.log(token);
      localStorage.setItem('token', token); // Store token in localStorage
      return token;
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
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
    rehydrateToken: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        state.token = token;
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
        state.token = action.payload;
        console.log("token: " + state.token);
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
      .addCase(logoutAsync.fulfilled, (state) => {
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;

export const { rehydrateToken } = authSlice.actions;
// Export async actions
export { loginAsync as login, registerEmailAsync as registerEmail, registerAsync as register, logoutAsync as logout, codeVerifyAsync as verify };
export const selectAccessToken = (state) => state.auth.token;