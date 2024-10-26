import React, { useState, useEffect } from 'react';
import { useWatchlist } from '../hooks/useWatchlist';
import axios from 'axios';

const Watchlist = () => {
  const { watchlist } = useWatchlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [genres, setGenres] = useState({});
  const [selectedGenre, setSelectedGenre] = useState('All Genre');

  // Fetch genres from the API
  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=cc12bca70c68345c53110fd767147544&language=en-US`
      );
      const genreMap = response.data.genres.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
      }, {});
      setGenres(genreMap);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  // Filter watchlist based on search query
  const filteredWatchlist = watchlist.filter((element) => {
    const matchesSearch = element.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'All Genre' || element.genre_ids.some(id => genres[id] === selectedGenre);
    return matchesSearch && matchesGenre;
  });

  return (
    <>
      <div>
        <div className="h-16 flex items-center justify-center overflow-x-auto">
          {['All Genre', 'Action', 'Crime'].map((genre) => (
            <div
              key={genre}
              className={`bg-slate-300 hover:bg-blue-500 text-white text-lg rounded-xl w-24 text-center mr-2 hover:cursor-pointer ${selectedGenre === genre ? 'bg-blue-500' : ''}`}
              onClick={() => setSelectedGenre(genre)} // Update selected genre on click
            >
              {genre}
            </div>
          ))}
        </div>
      </div>
      <div className="h-11 flex items-center justify-center mt-4">
        <input
          type="search"
          placeholder="Search for movies"
          className="border-black-1 bg-slate-200 hover:bg-blue-500 p-2 w-52"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className="w-full border border-slate mt-4">
        <thead className="border-b text-center bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Ratings</th>
            <th className="p-2">Popularity</th>
            <th className="p-2">Genre</th>
          </tr>
        </thead>
        <tbody>
          {filteredWatchlist.map((element, index) => (
            <tr key={index} className="border border-black text-center">
              <td className="flex items-center">
                <img
                  className="h-20 w-20 m-2"
                  src={`https://image.tmdb.org/t/p/w500${element.poster_path}`}
                  alt={`${element.title} Poster`}
                />
                {element.title}
              </td>
              <td className="p-2">{element.vote_average || 'N/A'}</td>
              <td className="p-2">High</td>
              <td className="p-2">
                {element.genre_ids.map((id) => genres[id] || 'Unknown').join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Watchlist;
