import React from 'react';
import axios from 'axios';
import { url } from '../App';
import { setUserData } from '../redux/userSlice';

const getCurrentUser = async(dispach) =>{
    try {
        const res = await axios.get(`${url}/user/b1`,{withCredentials:true});
        console.log(res.data);
        dispach(setUserData(res.data));
    } catch (error) {
        console.error(error);
    }
}

export default getCurrentUser;