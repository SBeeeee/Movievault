import React, { useState } from 'react';
import { useWatchlist } from '../hooks/useWatchlist'; // Ensure correct casing in import

const Watchlist = () => {
  const { watchlist } = useWatchlist();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter watchlist based on search query
  const filteredWatchlist = watchlist.filter((element) =>
    element.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div>
        <div className="h-16 flex items-center justify-center overflow-x-auto">
          {['All Genre', 'Action', 'Crime'].map((genre) => (
            <div
              key={genre}
              className="bg-slate-300 hover:bg-blue-500 text-white text-lg rounded-xl w-24 text-center mr-2"
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
          value={searchQuery} // Set value from state
          onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
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
              <td className="p-2">8.5</td>
              <td className="p-2">High</td>
              <td className="p-2">Action</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Watchlist;
