import React from 'react';
import { setNote } from '../redux/noteSlice';
import { useDispatch } from 'react-redux';

const clearNotes = async() =>{
    const dispach = useDispatch();
    try {
        await dispach(setNote(null));
    } catch (error) {
        console.error(error);
    }
} 

export default clearNotes;