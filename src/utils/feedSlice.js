import { createSlice } from "@reduxjs/toolkit";
const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    // removeFeed: (state, action) => null,
    removeUserfromFeed: (state, action) => {
          // const newFeed = state.filter((user) => user.id !== action.payload);
      // return newFeed;
      // Remove the user with matching _id from the feed
      if (!Array.isArray(state)) return state;
      return state.filter((user) => user._id !== action.payload);
    },
  },
});

export const { addFeed, removeUserfromFeed } = feedSlice.actions;
export default feedSlice.reducer;
