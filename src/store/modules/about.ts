import { createSlice } from '@reduxjs/toolkit';

export interface AboutState {
  counter: number;
}

const initialState: AboutState = {
  counter: 0,
};

export const about = createSlice({
  name: 'about',
  initialState,
  reducers: {
    setCounter(state, { payload }){
      console.log(payload);
      state.counter = payload.counter;
    }
  },
});

export const { setCounter } = about.actions;

export default about.reducer;