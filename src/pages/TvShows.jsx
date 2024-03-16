import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TVShows = () => {
  const [tvShows, setTVShows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&page=${page}`
        );
        const newTVShows = response.data.results;
        setTotalPages(response.data.total_pages);

        // Filter out duplicate TV shows by checking if the show ID already exists in the list
        const filteredTVShows = newTVShows.filter(
          (newShow) => !tvShows.some((show) => show.id === newShow.id)
        );

        setTVShows((prevShows) => [...prevShows, ...filteredTVShows]);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      }
    };

    fetchTVShows();
  }, [page]); // Fetch TV shows when page changes

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
      <div className="2xl:text-8xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-br from-blue-700 to-teal-400">Discover TV Shows</div>

      <div className="flex p-4 flex-wrap ">
        {tvShows.map((show) => (
          <div key={show.id} className="w-1/2 lg:w-2/12 2xl:w-1/12 p-2">
            <div>
              <Link to={`/tv-show/${show.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
                  alt={show.name}
                  className="rounded-xl"
                />
              </Link>
            </div>
            <div className="truncate">
              <Link to={`/tv-show/${show.id}`}>{show.name}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TVShows;
