import { createSlice } from "@reduxjs/toolkit";
import memesReducer from "./memesSlice"; // No `.ts` extension needed

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const memesSlice = createSlice({
  name: "memes",
  initialState,
  reducers: {
    setMemes: (state, action) => {
      state.items = action.payload;
    },
    addMeme: (state, action) => {
      state.items.unshift(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setMemes, addMeme, setLoading, setError } = memesSlice.actions;
export default memesSlice.reducer;
