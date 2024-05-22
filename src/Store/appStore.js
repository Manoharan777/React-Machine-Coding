import {configureStore} from "@reduxjs/toolkit";
import starSlice from "./starSlice";
const appStore = configureStore({
  reducer: {
    star: starSlice,
  },
});

export default appStore;