import React from 'react';
import axios from 'axios';
import { url } from '../App';
import { setNoteData } from '../redux/noteSlice';
import { useDispatch } from 'react-redux';

const getAllNotes = async() =>{
    const dispach = useDispatch();
    try {
        const res = await axios.get(`${url}/notes/d1`,{withCredentials:true});
        console.log(res.data);
        dispach(setNoteData(res.data));
    } catch (error) {
        console.error(error);
    }
}

export default getAllNotes;