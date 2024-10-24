import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Movies from './components/Movies'
import Watchlist from './components/Watchlist'
import Banner from './components/Banner'
function App() {
  const [pageno,setPageno]=useState(1);
  const pageinc =()=>{
    setPageno(P=>P+1);
  }
  const pagedec =()=>{
    setPageno(P=>P-1);
  }
  return (
    <>
      <BrowserRouter>
        <Navbar pageno={pageno} pageinc={pageinc} pagedec={pagedec}/>
        <Routes>
          <Route path='/' element={<><Banner /><div className="flex flex-wrap"><Movies pageno={pageno} pageinc={pageinc} pagedec={pagedec}/></div></>} />
          <Route path='/watchlist' element={<Watchlist />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
