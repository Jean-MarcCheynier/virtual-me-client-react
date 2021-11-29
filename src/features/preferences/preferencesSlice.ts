import { createSlice } from '@reduxjs/toolkit';

const getInitialLang = () => {
    const pathName = window.location.pathname;
    const lang = pathName.split('/')[1] || 'en';
    return lang;
}

const getInitialState = () => {
    return {
        lang: getInitialLang()
    }
}

export const userPreferencesSlice = createSlice({
    name: 'preferences',
    initialState: getInitialState(),
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setPreferences: ( state, action) => ({ ...state, ...action.payload}),
        setLang: (state: any, action: any) => ({ ...state, lang: action.payload }),
        reset: () => getInitialState(),
        setColor: (state, action) => ({ ...state, color: action.payload})
    },
});

export const { setLang, reset, setColor, setPreferences } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;