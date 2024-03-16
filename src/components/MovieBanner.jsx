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
    <div className="lg:flex relative lg:h-screen overflow-hidden items-center 2xl:items-start   ">
      {movieData && movieData.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`}
          alt=""
          className="absolute -z-10 opacity-20 lg:h-screen w-screen"
        />
      )}
      <div className="w-full lg:w-1/3 flex items-center p-16">
        {movieData && movieData.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
            alt=""
            className="rounded-2xl shadow-lg shadow-gray-800 2xl:mt-10"
          />
        )}
      </div>
      <div className="lg:w-2/3 pt-16 p-4 2xl:pl-20">
        <div className="lg:text-5xl text-4xl py-4 2xl:text-9xl 2xl:mt-24 2xl:pb-5">{movieData.title}</div>

        <div className="text-xl text-gray-400 2xl:text-2xl " >{movieData.tagline}</div>

        <div className="flex ">
          <div className="lg:w-3/4  lg:pr-10 ">
            <div className="flex flex-wrap  justify-around lg:justify-start lg:gap-2 py-4">
              {movieData &&
                movieData.genres &&
                movieData.genres.map((genre) => {
                  return (
                    <div
                      className="bg-gray-800 py-1 px-2 lg:px-6 rounded-2xl my-1 lg:my-0 text-sm text-gray-400 w-fit 2xl:text-xl"
                      key={genre.id}
                    >
                      {genre.name}
                    </div>
                  );
                })}
            </div>

            <div
              className="subtitle flex items-center gap-5 text-lg  py-4 2xl:text-2xl"
              data-swiper-parallax="-200"
            >
              <div className="flex items-center gap-2">
                <CiStar className="text-xl" /> {movieData.vote_average}
              </div>
              <div className="font-semibold">{movieData.release_date}</div>
              <div className="font-semibold">{movieData.runtime} min</div>
            </div>

            <div className="py-2 2xl:text-xl">
             {movieData.overview}
            </div>

            <div className="flex justify-center lg:justify-start gap-4 py-4 2xl:pt-10">
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
