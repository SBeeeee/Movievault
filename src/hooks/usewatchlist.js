// useWatchlist.js
import { useState, useEffect } from 'react';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState(() => {
    // Retrieve watchlist from localStorage, or default to an empty array
    const savedWatchlist = localStorage.getItem('watchlist');
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

  useEffect(() => {
    // Save watchlist to localStorage whenever it changes
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Export both watchlist and setWatchlist
  return { watchlist, setWatchlist };
};
