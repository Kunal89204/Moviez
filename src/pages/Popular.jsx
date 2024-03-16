import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}&page=${page}`
        );
        const newMovies = response.data.results;
        setTotalPages(response.data.total_pages);

        // Append new top-rated movies to the existing list
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };

    fetchTopRatedMovies();
  }, [page]); // Fetch top-rated movies when page changes

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (page < totalPages) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, totalPages]); // Re-add event listener when page or totalPages change

  return (
    <div className="text-lg pt-20">
      <div className="2xl:text-8xl">Top Rated Movies</div>

      <div className="flex p-4 flex-wrap ">
        {movies.map((movie) => (
          <div key={movie.id} className="w-1/2 lg:w-2/12 2xl:w-1/12 p-2">
            <div>
              <Link to={`/movie-info/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-xl"
                />
              </Link>
            </div>
            <div className="truncate">
              <Link to={`/movie-info/${movie.id}`}>{movie.title}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
