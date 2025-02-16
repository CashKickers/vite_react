import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategories: [], // 여러 개의 카테고리 선택 가능
  categories: ["맛", "가격", "청결도", "고객응대", "분위기"], // 고정된 카테고리 목록
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      const category = action.payload;
      if (state.selectedCategories.includes(category)) {
        // 이미 선택된 카테고리면 제거
        state.selectedCategories = state.selectedCategories.filter((c) => c !== category);
      } else {
        // 새로운 카테고리면 추가
        state.selectedCategories.push(category);
      }
    },
    clearCategory: (state) => {
      state.selectedCategory = null;
    },
  },
});

export const { selectCategory, clearCategory } = reviewSlice.actions;
export default reviewSlice.reducer;
