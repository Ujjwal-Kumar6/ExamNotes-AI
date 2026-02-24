import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function PametSuccess() {
    const dispach = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
      getCurrentUser(dispach);
    },[dispach]);
  return (
    <div className='flex flex-col gap-4 bg-black w-full h-screen justify-center items-center'>
      <h1 className="text-5xl text-center text-white px-8">
        Congratulations! 🎉🎉🎉 Your Payment was Successful. Your Credits have been Added!
      </h1>
      <hr className="w-full border-gray-700" />
      <button onClick={() => nav("/")} className="text-2xl py-3 px-6 bg-white rounded-2xl">
        Go to Home
      </button>
    </div>
  )
}

export default PametSuccess;