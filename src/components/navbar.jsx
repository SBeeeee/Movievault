import { BiMoviePlay } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
function Navbar({pageno,pageinc,pagedec}) {
  
    return (<>
        <div className="border-black border-2 h-14 flex items-center gap-4">
            <BiMoviePlay className="text-4xl" />
            <Link to='/' className="text-xl text-cyan-500 font-bold">Movies</Link>
            <Link to='/watchlist' className="text-xl text-cyan-500 font-bold">Watchlist</Link>
            <button onClick={pageinc} className="bg-violet-500 rounded-xl p-1">Next page</button>
            <button onClick={pagedec} className="bg-violet-500 rounded-xl p-1">Previous Page</button>
      </div>
    </>)}

export default Navbar;
