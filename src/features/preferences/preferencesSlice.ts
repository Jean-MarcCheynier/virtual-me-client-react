import { createSlice } from '@reduxjs/toolkit';

const getInitialLang = () => {
    const pathName = window.location.pathname;
    const lang = pathName.split('/')[1]
    return lang;
}

export const userPreferencesSlice = createSlice({
    name: 'preferences',
    initialState: {
        lang: getInitialLang()},
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setLang: (state: any, action: any) => ({ ...state, lang: action.payload})
    },
});

export const { setLang } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;