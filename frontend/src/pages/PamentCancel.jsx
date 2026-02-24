import React from 'react'
import { useNavigate } from 'react-router-dom'

function PamentCancel() {
    const nav = useNavigate();
  return (
    <div className='flex flex-col gap-4 not-first: bg-black w-full h-screen flex justify-center items-center'>
      <h1 className="text-5xl text-center text-white px-8">
        Sorry! Your Payment has Failed. Please Try Again.
      </h1><hr/>
      <button onClick={()=>nav("/")} className="w-auto text-2xl py-3 px-3 h-auto bg-white rounded-2xl">Go to Home</button>
    </div>
  )
}

export default PamentCancel