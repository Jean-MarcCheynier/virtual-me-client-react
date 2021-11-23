import { createSlice } from '@reduxjs/toolkit';

const getInitialLang = () => {
    const pathName = window.location.pathname;
    const lang = pathName.split('/')[1]
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
        setLang: (state: any, action: any) => ({ ...state, lang: action.payload }),
        reset: () => getInitialState()
    },
});

export const { setLang, reset } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;