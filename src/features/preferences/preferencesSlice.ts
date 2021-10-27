import { createSlice } from '@reduxjs/toolkit';

export const userPreferencesSlice = createSlice({
    name: 'preferences',
    initialState: { lang: ''},
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setLang: (state: any, action: any) => ({ ...state, lang: action.payload})
    },
  });
  
  export const { setLang } = userPreferencesSlice.actions;

  export default userPreferencesSlice.reducer;
  