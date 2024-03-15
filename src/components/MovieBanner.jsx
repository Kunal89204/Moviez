import axios from "axios";
import React, { useState, useEffect } from "react";
import { CiStar } from "react-icons/ci";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
const MovieBanner = (props) => {
  // const { movieid } = useParams();
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${props.movieid}?api_key=${
          import.meta.env.VITE_API_KEY
        }&append_to_response=credits`
      )
      .then((response) => {
        setMovieData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.movieid]);


  return (
    <div className="flex relative h-screen overflow-hidden  ">
      {movieData && movieData.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`}
          alt=""
          className="absolute -z-10 opacity-20"
        />
      )}
      <div className="w-1/3 flex items-center p-16">
        {movieData && movieData.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
            alt=""
            className="rounded-2xl shadow-lg shadow-gray-800"
          />
        )}
      </div>
      <div className="w-2/3 pt-16">
        <div className="text-5xl py-4">{movieData.title}</div>

        <div className="text-xl text-gray-400" >{movieData.tagline}</div>

        <div className="flex ">
          <div className="w-3/4 pr-10 ">
            <div className="flex gap-2 py-4">
              {movieData &&
                movieData.genres &&
                movieData.genres.map((genre) => {
                  return (
                    <div
                      className="bg-gray-800 py-1 px-6 rounded-2xl text-gray-400 w-fit"
                      key={genre.id}
                    >
                      {genre.name}
                    </div>
                  );
                })}
            </div>

            <div
              className="subtitle flex items-center gap-5 text-lg py-4"
              data-swiper-parallax="-200"
            >
              <div className="flex items-center gap-2">
                <CiStar className="text-xl" /> {movieData.vote_average}
              </div>
              <div className="font-semibold">{movieData.release_date}</div>
              <div className="font-semibold">{movieData.runtime} min</div>
            </div>

            <div className="py-2">
             {movieData.overview}
            </div>

            <div className="flex gap-4 py-4">
              <Link to={`/movie/${movieData.id}`}>
                <button className="py-4 px-10 rounded-full hover:scale-105 bg-gradient-to-r from-blue-800 to-teal-400 font-semibold">
                  Watch Now
                </button>
              </Link>
              <button className="py-4 px-10 rounded-full hover:bg-gradient-to-r hover:from-blue-800 hover:to-teal-400 hover:border-transparent border-2 border-teal-300 font-semibold">
                To Watchlist
              </button>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default MovieBanner;
