import {createSlice} from "@reduxjs/toolkit";

const starSlice = createSlice({
    name:"star",
    initialState: {
        rating : 0,
    },
    reducers : {
        addRating : (state,action) => {
            state.rating = action.payload;
        }
    }
})

export const {addRating} = starSlice.actions;
export default starSlice.reducer;