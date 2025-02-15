import { createSlice } from "@reduxjs/toolkit";
// import { loadFavorites, saveFavorites } from "../utils/localStorage";

const initialState = {
  selectedRestaurantId: null,
  previousRestaurantId: null,
//   favoriteRestaurants: loadFavorites(), // 초기 로드 시 localStorage에서 가져옴
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    selectRestaurant: (state, action) => {
      state.previousRestaurantId = state.selectedRestaurantId;
      state.selectedRestaurantId = action.payload;
    },
    clearSelection: (state) => {
      state.previousRestaurantId = state.selectedRestaurantId;
      state.selectedRestaurantId = null;
    },
    // addFavorite: (state, action) => {
    //   if (!state.favoriteRestaurants.includes(action.payload)) {
    //     state.favoriteRestaurants.push(action.payload);
    //     saveFavorites(state.favoriteRestaurants); // localStorage 업데이트
    //   }
    // },
    // removeFavorite: (state, action) => {
    //   state.favoriteRestaurants = state.favoriteRestaurants.filter(id => id !== action.payload);
    //   saveFavorites(state.favoriteRestaurants);
    // },
  },
});

export const { selectRestaurant, clearSelection, } = restaurantSlice.actions;
export default restaurantSlice.reducer;
