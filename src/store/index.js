import { configureStore } from '@reduxjs/toolkit'
import restaurantReducer from "./restaurantSlice";
import reviewReducer from "./reviewSlice";

export const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    review: reviewReducer,
  },
}) 