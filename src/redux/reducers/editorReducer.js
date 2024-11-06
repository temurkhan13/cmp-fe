import { createSlice } from '@reduxjs/toolkit';

const EditorSlice = createSlice({
  name: 'content',
  initialState: {
    content: '',
  },
  reducers: {
    addContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { addContent } = EditorSlice.actions;
export default EditorSlice.reducer;
