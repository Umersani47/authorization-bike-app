import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { url } from '../../utils/constant';
import axiosInstance from '../../utils/axoisInstance';

const API_URL = url;

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/users/sign_in`, { user: { email, password } });
    const token = response.data.token;

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const roleResponse = await axiosInstance.get(`${API_URL}/api/v1/users/user_role`);
    return { ...response.data, role: roleResponse.data };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('authToken') || null,
    role: localStorage.getItem('authRole') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('authRole');
      delete axios.defaults.headers.common['Authorization'];
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role;
        localStorage.setItem('authToken', action.payload.token);
        localStorage.setItem('authRole', action.payload.role);
        axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
