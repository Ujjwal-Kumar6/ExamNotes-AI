import { createSlice } from "@reduxjs/toolkit";

const amountSlice = createSlice({
    name: 'amount',
    initialState:{
        amount:null,
    },
    reducers: {
        setAmount: (state, action) => {
            state.amount = action.payload;
        }
    },
});

export const {setAmount} = amountSlice.actions;
export default amountSlice.reducer;