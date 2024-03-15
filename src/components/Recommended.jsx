import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const Recommended = (props) => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${props.movieid}/recommendations?language=en-US&page=1`,
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            language: "en-US",
          },
        }
      )
      .then((response) => {
        setRecommendedMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, [props.movieid]);

  return (
    <div className="py-4">
      <div className="text-4xl py-4">Recommended</div>
      <div>
        <Swiper spaceBetween={10} slidesPerView={3}>
          {recommendedMovies &&
            recommendedMovies.map((movies) => {
              return (
                <SwiperSlide>
                  <div>
                    <div className="rounded-xl overflow-hidden">
                      <Link to={`/movie-info/${movies.id}`}>
                        <img
                          src={`https://media.themoviedb.org/t/p/original/${movies.backdrop_path}`}
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="text-2xl">
                      <Link to={`/movie-info/${movies.id}`}>
                        {movies.title}
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default Recommended;
