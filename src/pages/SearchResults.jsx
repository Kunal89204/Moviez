import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";


const SearchResults = () => {
  const [results, setResults] = useState([]);
  const { moviename } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${moviename}`
      )
      .then((response) => {
        setResults(response.data.results);
       
      });
  }, [moviename]);

  return (
    <div className="pt-16">
      {results.map((movie) => (
        <div key={movie.id} className="flex items-center lg:items-start p-2 mb-4 relative overflow-hidden ">
            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="" className="  absolute -z-10 top-0 opacity-40 w-full" />
          <div className="2xl:w-2/12 lg:w-1/5 w-1/3 rounded-xl overflow-hidden p-3">
            <Link to={`/movie-info/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              className="rounded-xl overflow-hidden"
            /></Link>
          </div>
          <div className="px-5 2xl:px-10 2xl:w-8/12 lg:w-4/5 w-2/3">
            <div className="lg:text-4xl 2xl:text-7xl 2xl:py-8 text-lg lg:py-4"><Link to={`/movie-info/${movie.id}`}>{movie.title}</Link></div>
            <div className="flex gap-10">
              <div className="flex gap-2 items-center lg:pb-4 lg:text-lg">
                <CiStar /><span>{movie.vote_average}</span>
              </div>
              <div>{movie.release_date.split('-')[0]}</div>
            </div>
            <div className="lg:text-lg 2xl:text-2xl text-sm line-clamp-4">{movie.overview}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
