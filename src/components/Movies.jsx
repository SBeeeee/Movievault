import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useWatchlist } from '../hooks/usewatchlist.js'; // Adjusted import path

const Movies = ({ pageno }) => {
  const { watchlist, setWatchlist } = useWatchlist();
  const [movies, setMovies] = useState([]);
  const [addedStates, setAddedStates] = useState([]);

  const handleAdd = (index) => {
    const movie = movies[index];
    if (!movie) return; // Prevent errors if movie is undefined

    if (addedStates[index]) {
      // Remove the movie from the watchlist
      setWatchlist((prevWatchlist) =>
        prevWatchlist.filter((m) => m.id !== movie.id)
      );
    } else {
      // Add the movie to the watchlist
      setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
    }

    // Toggle the added state for the specific movie
    const updatedAddedStates = [...addedStates];
    updatedAddedStates[index] = !updatedAddedStates[index]; // Toggle state
    setAddedStates(updatedAddedStates); // Update the state
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key={yourapikey}&language=en-US&page=${pageno}`
        );
        setMovies(response.data.results);

        // Initialize added states based on the current watchlist
        const initialAddedStates = response.data.results.map((movie) =>
          watchlist.some((m) => m.id === movie.id)
        );
        setAddedStates(initialAddedStates); // Set initial added states
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [pageno, watchlist]); // Watchlist is a dependency to ensure states update properly

  return (
    <>
      {movies.map((element, index) => (
        <div
          key={element.id}
          className="border-black rounded-xl border-2 w-40 h-52 m-2 bg-cover bg-center hover:cursor-pointer flex flex-col justify-between transform transition duration-300 hover:scale-110"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${element.backdrop_path})`,
          }}
        >
          <div onClick={() => handleAdd(index)} className="self-end rounded-xl">
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
