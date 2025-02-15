import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: null,
  categories: ["맛", "가격", "청결도", "고객응대", "분위기"], // 고정된 카테고리 목록
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearCategory: (state) => {
      state.selectedCategory = null;
    },
  },
});

export const { selectCategory, clearCategory } = reviewSlice.actions;
export default reviewSlice.reducer;
