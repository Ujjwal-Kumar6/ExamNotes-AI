import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice.js';
import noteSlice from './noteSlice.js';
import amountSlice from './amountSlice.js';

export default configureStore({
    reducer: {
        user:userSlice,
        notes:noteSlice,
        amount:amountSlice
    },
});