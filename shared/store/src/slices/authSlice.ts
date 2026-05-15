import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthUser } from 'shared-types';
import { RootState } from '../store';

interface AuthState {
  isLogin: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  tokenType: string | null;
  expiresIn: string | null;
  refreshExpiresIn: string | null;
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLogin: false,
  accessToken: null,
  refreshToken: null,
  tokenType: null,
  expiresIn: null,
  refreshExpiresIn: null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        tokenType: string;
        expiresIn: string;
        refreshExpiresIn: string;
        user: AuthUser;
      }>
    ) => {
      state.isLogin = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.tokenType = action.payload.tokenType;
      state.expiresIn = action.payload.expiresIn;
      state.refreshExpiresIn = action.payload.refreshExpiresIn;
      state.user = action.payload.user;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.tokenType = null;
      state.expiresIn = null;
      state.refreshExpiresIn = null;
      state.user = null;
      state.error = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearAuthError } = authSlice.actions;

// Selectors
export const selectAuth = (state: RootState) => state.auth;
/** `isLogin` alias kept as `selectIsAuthenticated` for component compatibility */
export const selectIsAuthenticated = (state: RootState) => state.auth.isLogin;
export const selectAuthToken = (state: RootState) => state.auth.accessToken;
export const selectAuthUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
