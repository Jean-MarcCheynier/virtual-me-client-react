import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { signin, signup, getMe } from './authAPI';
import { IUser, Role } from '@virtual-me/virtual-me-ts-core';


export interface IAuthState {
  token?: any;
  role?: Role;
  signin?: {
    status: string
  },
  signup?: {
    status: string
  }

}

const getInitialState: () => IAuthState = () => {
  let state: IAuthState = {
    signin: {
      status: 'idle'
    },
    signup: {
      status: 'idle'
    }
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
  async (payload: { login: string, password: string }, thunkAPI) => {
    const response = await signin(payload).catch(e => { throw thunkAPI.rejectWithValue(e) });
    window.sessionStorage.setItem('virtualMe', JSON.stringify(response.data));
    return response.data;
  }
);

export const signupAsync = createAsyncThunk(
  'auth/signup',
  async (payload: { login: string, password: string }, thunkAPI) => {
    const response = await signup(payload).catch(e => { throw thunkAPI.rejectWithValue(e) });
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
        return { ...state, signin: { status: 'loading' } };
      })
      .addCase(signinAsync.fulfilled, (state, action: PayloadAction<IUser>) => {
        return { ...state, signin: { status: 'idle' }, ...action.payload }
      })
      .addCase(signinAsync.rejected, (state, action: PayloadAction<any>) => {
        return { ...state, signin: { status: 'error', error: action.payload } }
      })
      .addCase(signupAsync.pending, (state, { meta }) => {
        return { ...state, signup: { status: 'loading' } }
      })
      .addCase(signupAsync.fulfilled, (state, action: PayloadAction<any>) => {
        return { ...state, signup: { status: 'idle' }, ...action.payload }
      })
      .addCase(signupAsync.rejected, (state, action: PayloadAction<any>) => {
        return { ...state, signup: { status: 'error', error: action.payload } }
      })
      .addCase(geMeAsync.fulfilled, (state, action: PayloadAction<any>) => {
        return { ...state }
      })
      .addCase(geMeAsync.rejected, (state, { meta, payload }) => {
        return getInitialState();
      });
  },
});

export const { reset } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
