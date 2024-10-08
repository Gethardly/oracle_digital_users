import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';

interface ThemeState {
  isDarkMode: boolean;
}

const initialState: ThemeState = {
  isDarkMode: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const selectThemeMode = (state: RootState) => state.theme?.isDarkMode;
export const themeReducer = themeSlice.reducer;