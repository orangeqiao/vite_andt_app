import { createSlice } from '@reduxjs/toolkit';
import { initLangage } from '@/utils/initLangage';
export interface CommonState {
  languageValue: string| null;
}

const initialState: CommonState = {
  languageValue: initLangage(),
};

export const common = createSlice({
  name: 'about',
  initialState,
  reducers: {
    setLanguage(state, { payload }){
      console.log(payload);
      state.languageValue = payload;
    }
  },
});

export const { setLanguage } = common.actions;

export default common.reducer;