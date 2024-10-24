import React from 'react';

const Watchlist = () => {
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
          <tr className="border border-black text-center">
            <td>
              <img
                className="h-20 w-20 m-2"
                src="data:image/jpeg;base64,..."
                alt="Movie Poster"
              />
              Movie Name
            </td>
            <td className="p-2">8.5</td>
            <td className="p-2">High</td>
            <td className="p-2">Action</td>
          </tr>
          {/* More rows can be added dynamically */}
        </tbody>
      </table>
    </>
  );
};

export default Watchlist;
