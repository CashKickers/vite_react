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
      const { category, isSelected } = action.payload;

      if (isSelected) {
        // 선택: 중복 방지 후 추가
        if (!state.selectedCategories.includes(category)) {
          state.selectedCategories.push(category);
        }
      } else {
        // 선택 해제: 해당 카테고리 제거
        state.selectedCategories = state.selectedCategories.filter((c) => c !== category);
      }
    },
    clearCategory: (state) => {
      state.selectedCategories = [];
    },
  },
});

export const { selectCategory, clearCategory } = reviewSlice.actions;
export default reviewSlice.reducer;
