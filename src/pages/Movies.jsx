import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&page=${page}`
        );
        const newMovies = response.data.results;
        setTotalPages(response.data.total_pages);

        // Filter out duplicate movies by checking if the movie ID already exists in the list
        const filteredMovies = newMovies.filter(
          (newMovie) => !movies.some((movie) => movie.id === newMovie.id)
        );

        setMovies((prevMovies) => [...prevMovies, ...filteredMovies]);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [page]); // Fetch movies when page changes

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
      <div className=" text-2xl px-4 lg:text-5xl lg:px-4 2xl:text-8xl bg-clip-text text-transparent bg-gradient-to-br from-blue-700 to-teal-400">Watch Your Favorite Movie</div>

      <div className="flex p-4 flex-wrap ">
        {movies.map((movie) => (
          <div key={movie.id} className="w-1/2 lg:w-2/12 2xl:w-1/12 p-2 hover:scale-105">
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

export default Movies;
