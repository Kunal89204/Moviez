import React, { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import axios from "axios";
import Recommended from "../Recommended";
import Reviews from "../Reviews";

const Player = (props) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${props.id}?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then((response) => {
        setMovieData(response.data);
      })
      .catch((error) => [console.log(error)]);
  }, [props.id]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${props.id}/videos?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then((response) => {
        const trailerData = response.data;
        const trailer = trailerData.results.find(
          (result) => result.type === "Trailer" && result.site === "YouTube"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          console.error("No trailer found for this movie");
        }
      });
  }, [props.id]);

  if (!movieData || !trailerKey) {
    return <div>Loading...</div>;
  }

  const videoUrl = `https://www.youtube.com/embed/${trailerKey}`;

  return (
    <div className="pt-16">
      <div className="  rounded-xl overflow-hidden p-4 lg:p-10 ">
        <iframe
          className=" lg:h-[80vh] h-[25vh] w-full rounded-2xl"
          src={videoUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      <div>
        <div className="flex p-4 ">
          <div className="w-1/3  p-2 h-min ">
            <img
              src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
              alt={movieData.title}
              className="rounded-xl "
            />
          </div>
          <div className="w-2/3 px-4">
            <div className="lg:text-6xl text-2xl py-4">{movieData.title}</div>
            <div className="lg:text-lg text-gray-400">{movieData.tagline}</div>
            <div className="flex gap-2 pt-1 lg:pt-4 lg:pb-2">
              {movieData.genres.map((genre) => (
                <div
                  key={genre.id}
                  className="bg-gray-800 py-1 px-2 rounded-2xl text-sm text-gray-400"
                >
                  {genre.name}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 lg:mt-4 mt-1 text-sm">
              <span className="text-xl">
                <CiStar />
              </span>
              <span>{movieData.vote_average}</span>
              <span>{movieData.release_date}</span>
              <span>{movieData.runtime} min</span>
            </div>
            <div className="py-4 lg:text-lg hidden lg:block">
              {movieData.overview}
            </div>

            <div>
             
              <div className="hidden lg:block"><Recommended  movieid={props.id} /></div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 lg:text-lg lg:hidden block">
                {movieData.overview}
              </div>
              <div className="lg:hidden block"><Recommended  movieid={props.id} /></div>
      <Reviews movieid={props.id} />
    </div>
  );
};

export default Player;
