import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
    name: 'note',
    initialState:{
        noteData:null,
        note:null,
    },
    reducers: {
        setNoteData: (state, action) => {
            state.noteData = action.payload;
        },
        setNote: (state, action) => {
            state.note = action.payload;
        },
        clearNoteData: (state) => {
            state.note = null;
        }
    },
});

export const {setNoteData, setNote, clearNoteData } = noteSlice.actions;
export default noteSlice.reducer;