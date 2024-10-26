import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Banner = () => {
    const [bannerImage, setBannerImage] = useState('');
    const [movieTitle, setMovieTitle] = useState(''); // State to store the movie title

    useEffect(() => {
        const fetchBannerImage = async () => {
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/movie/popular?api_key={yourapikey}&language=en-US&page=1'
                );

                const randomMovie = response.data.results[Math.floor(Math.random() * response.data.results.length)];

                setBannerImage(`https://image.tmdb.org/t/p/w500${randomMovie.backdrop_path}`);
                setMovieTitle(randomMovie.title); // Set the movie title
            } catch (error) {
                console.error("Error fetching banner image:", error);
            }
        };

        fetchBannerImage();


        const intervalId = setInterval(fetchBannerImage, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${bannerImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className="w-screen flex items-end h-[75vh]"
            >
                <div className="w-[100%] text-white text-xl text-center bg-slate-900 opacity-60">
                    {movieTitle}
                </div>
            </div>
            <div className="w-screen text-center font-extrabold text-lg">Trending</div>
        </>
    );
};

export default Banner;

