import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';

const Movies = ({ pageno, pageinc, pagedec }) => {
  const [watchlist,setWatchlist]=useState([])
  const [movies, setMovies] = useState([]);
  const [addedStates, setAddedStates] = useState([]); // This will hold the 'isAdded' state for each movie

  const handleAdd = (index) => {
    
    setWatchlist([...watchlist,movies[index]]);//it is getting added no matter what the emoji being tapped is
    const updatedAddedStates = [...addedStates];
    updatedAddedStates[index] = !updatedAddedStates[index]; // Toggle the state for the specific movie
    setAddedStates(updatedAddedStates); // Update the state
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=cc12bca70c68345c53110fd767147544&language=en-US&page=${pageno}`,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzEyYmNhNzBjNjgzNDVjNTMxMTBmZDc2NzE0NzU0NCIsIm5iZiI6MTcyNzYwMjAyNC44MjgzNjksInN1YiI6IjY2ZjkxYjU0MTQwZmJmNmExYTVmNjQ3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wn1HOa_E1L-zZAf7r4mDcQMtvPCjayD6tNdFuQxUl-w',
              accept: 'application/json',
            },
          }
        );
        setMovies(response.data.results);
        setAddedStates(new Array(response.data.results.length).fill(false)); // Initialize added states for each movie
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [pageno]);
  useEffect(() => {
    console.log(watchlist);
  }, [watchlist]);

  return (
    <>
      {movies.map((element, index) => (
        <div
          key={element.id} // Add a unique key for each movie element
          className="border-black rounded-xl border-2 w-40 h-52 m-2 bg-cover bg-center hover:cursor-pointer flex flex-col justify-between transform transition duration-300 hover:scale-110"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${element.backdrop_path})`,
          }}
        >
          <div
            onClick={() => handleAdd(index)}
            className="self-end rounded-xl"
          >
            {addedStates[index] ? <span>❌</span> : <span>&#128525;</span>}
          
          </div>
      

          <div className="w-[100%] text-center text-white bg-slate-900 opacity-60">
            {element.title}
          </div>
        </div>
      ))}
    </>
  );
};

export default Movies;


