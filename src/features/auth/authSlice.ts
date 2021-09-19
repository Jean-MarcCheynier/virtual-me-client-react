import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { signin, signup, getMe } from './authAPI';
import { IUser } from '@virtual-me/virtual-me-ts-core';


export interface IAuthState {
  token?: any;
  status: string
}

const getInitialState: () => IAuthState = () => {
  let state: IAuthState = {
    status: 'idle'
  }
  const strSession = window.sessionStorage.getItem('virtualMe');
  if (strSession) {
    console.info("hasSession")
    try {
      const JSONsession = JSON.parse(strSession);
      state = { ...state, ...JSONsession } 
    }
    catch {
      console.error("Could not parse localSession");
      window.sessionStorage.removeItem('virtualMe');
    }
  }
  return state;
};

export const geMeAsync = createAsyncThunk(
  'auth/me',
  async () => {
    const response = await getMe();
    return response.data;
  }
);


export const signinAsync = createAsyncThunk(
  'auth/signin',
  async (payload: { login: string, password: string }) => {
    const response = await signin(payload)
      .then(response => {
        return response;
      });
    window.sessionStorage.setItem('virtualMe', JSON.stringify(response.data));
    return response.data;
  }
);

export const signupAsync = createAsyncThunk(
  'auth/signup',
  async (payload: { login: string, password: string }) => {
    const response = await signup(payload);
    return response;
  }
);

export const signout = () => {
  return (dispatch: any) => {
    window.sessionStorage.removeItem('virtualMe');
    return dispatch(reset());
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    reset: () => getInitialState() 
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(signinAsync.pending, (state, { meta }) => {
        return { status: 'loading' };
      })
      .addCase(signinAsync.fulfilled, (state, action: PayloadAction<IUser>) => {
        return { ...state, status: 'idle', ...action.payload }
      })
      .addCase(signinAsync.rejected, (state, { meta }) => {
        return { status: 'error' }
      })
      .addCase(geMeAsync.fulfilled, (state, action: PayloadAction<any>) => {
        return { ...state }
      })
      .addCase(geMeAsync.rejected, (state, { meta }) => {
        return getInitialState();
      });
  },
});

export const { reset } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
