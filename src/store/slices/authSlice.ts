import { RootState } from '../../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../../types';
import { encryptData } from '../../utils/cryptData';

export type AuthStateType = {
  user: UserType | null;
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: AuthStateType = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthStateType>) => {
      encryptData('auth', action.payload);
      return action.payload;
    },
    setNewAccessToken: (state, action: PayloadAction<string>) => {
      encryptData('auth', state);
      state.accessToken = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.clear();
    },
    initCredentials: (state, action: PayloadAction<AuthStateType>) => {
      return action.payload;
    },
  },
});

export const { setCredentials, logOut, setNewAccessToken, initCredentials } =
  authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
