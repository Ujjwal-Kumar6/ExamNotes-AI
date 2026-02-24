import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Hero from './pages/Auth';
import getCurrentUser from './hooks/getCurrentUser';
import { useDispatch, useSelector } from 'react-redux';
import Notes from './pages/Notes';
import History from './pages/History';
import Current from './pages/Current';
import Price from './pages/price';
import PamentCancel from './pages/PamentCancel';
import PametSuccess from './pages/PammetnSucces';

export const url = import.meta.env.VITE_SERVER_URL;
function App() {
  const dispach = useDispatch();
  const {userData} = useSelector((state ) => state.user);
  useEffect(() => {
    getCurrentUser(dispach);
  },[dispach]);
  return (
    <>
      <Routes>
        <Route path='/' element={userData? <Home /> : <Hero/>} />
        <Route path='/auth' element={userData? <Home /> : <Hero/> }/>
        <Route path='/create-note' element={userData? <Notes/> : <Hero/>}/>
        <Route path='/my-notes' element={userData? <History/> : <Hero/>}/>
        <Route path='/notes/:id' element={userData? <Current/> : <Hero/>}/>
        <Route path='/dashboard' element={userData ? <Price/> : <Hero/>}/>
        <Route path='/cancel' element={<PamentCancel/>} />
        <Route path='/success' element= {<PametSuccess/>} />
      </Routes>
    </>
  )
}

export default App;
