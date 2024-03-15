import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Parallax, Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import { CiStar } from "react-icons/ci";
import { Link } from "react-router-dom";


const Hero = ({ movieIds }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieData = await Promise.all(
          movieIds.map(async (movieId) => {
            const response = await axios.get(
              `https://api.themoviedb.org/3/movie/${movieId}`,
              {
                params: {
                  api_key: import.meta.env.VITE_API_KEY,
                  language: "en-US",
                },
              }
            );
            return response.data;
          })
        );
        setMovies(movieData);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [movieIds]);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className="mySwiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="h-[100vh] relative">
              <div
                className="absolute top-0 left-0 h-full w-full bgsh"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.belongs_to_collection.backdrop_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              {/* Info div below */}
              <div className="absolute top-1/2 -translate-y-1/2 w-2/3 px-14">
                <div
                  className="title text-6xl py-6 bg-clip-text text-transparent bg-gradient-to-tr from-blue-700 to bg-teal-400 font-semibold"
                  data-swiper-parallax="-300"
                >
                  {movie.title}
                </div>
                <div
                  className="subtitle flex items-center gap-5 text-lg py-2"
                  data-swiper-parallax="-200"
                >
                  <div className="flex items-center gap-2">
                    <CiStar className="text-xl" /> {movie.vote_average}
                  </div>
                  <div className="font-semibold">{movie.release_date}</div>
                  <div className="font-semibold">{movie.runtime} min</div>
                </div>
                <div className="text-lg py-4" data-swiper-parallax="-100">
                  <p>{movie.overview}</p>
                </div>

                <div className="py-8">
                  <Link to={`/movie-info/${movie.id}`}><button className="py-4 px-10 bg-gradient-to-r from-blue-800 to-teal-400 font-semibold">
                    Watch Now
                  </button></Link>
                </div>
              </div>
              {/* Info div above */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Hero;
