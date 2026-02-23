import React from 'react'
import Nav from '../componets/nav';
import Hero from '../componets/hero';
import Footer from '../componets/futter';

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-slate-100">
      <Nav/>
      <Hero/>
      <Footer/>
    </div>
  )
}

export default Home;