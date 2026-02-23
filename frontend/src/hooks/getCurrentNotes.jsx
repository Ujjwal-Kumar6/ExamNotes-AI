import axios from 'axios';
import { url } from '../App';
import { setNote } from '../redux/noteSlice';

const getCurrentNote = async (notesId, dispatch) => {
    try {
        const res = await axios.get(`${url}/notes/d1/${notesId}`, {
            withCredentials: true
        });

        console.log(res.data);

        dispatch(setNote(res.data));
    } catch (error) {
        console.error(error);
    }
};

export default getCurrentNote;