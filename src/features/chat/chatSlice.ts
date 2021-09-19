import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { sendMessage } from './chatAPI';
import { I18NTextMessage } from '../../@types/message';
import { ITextMessage } from '@virtual-me/virtual-me-ts-core';

export interface ChatState {
  messageList: any[];
  status: string
}

const initialState: ChatState = {
  messageList: [],
  status: 'idle'
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const sendMessageAsync = createAsyncThunk(
  'chat/sendMessage',
  async (message: ITextMessage, { getState }) => {
    const messages = await sendMessage({ message })
      .then(response => response.data.messages)
      .catch(e => {
        if (e.response) {
          switch (e.response.status) {
            case 401:
              return [new I18NTextMessage("chat.form.error.unauthorized")]
            default:
              return [new I18NTextMessage("chat.form.error.default")]
          }
        } else {
          return [new I18NTextMessage("chat.form.error.connexion")]
        }
      })
    // The value we return becomes the `fulfilled` action payload
    return messages;
  }
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    sendMessage: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.messageList = [state.messageList, ...action.payload]
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageAsync.pending, (state, { meta }) => {
        state.status = 'loading';
        state.messageList = [...state.messageList, meta.arg]
      })
      .addCase(sendMessageAsync.fulfilled, (state, action: PayloadAction<any>) => {
        console.log(action);
        state.status = 'idle';
        state.messageList = [...state.messageList, ...action.payload]
      })
      .addCase(sendMessageAsync.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'error';
        state.messageList = [...state.messageList, ...action.payload]
      });
  },
});

//export const { increment, decrement, incrementByAmount } = chatSlice.actions;

export const selectMessageList = (state: RootState) => state.chat.messageList;

export default chatSlice.reducer;
