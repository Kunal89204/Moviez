import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import axios from "axios";

const CategoryCarousal = (props) => {
    const [popularMovie, setPopularMovie] = useState([]);

    useEffect(() => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${props.category}?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en-US&page=1`
        )
        .then((response) => {
          setPopularMovie(response.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    return (
      <div className="p-2">
        <div className="text-3xl py-4">
          <Link to={"/popular"}>{props.categoryType}</Link>{" "}
        </div>
  
        <div>
          <Swiper
            spaceBetween={50}
            slidesPerView={4}
            navigation={true}
            modules={[Navigation]}
          >
            {popularMovie && popularMovie.map((movie) => {
              return (
                  <SwiperSlide>
              <div className=" rounded-xl ">
                <div>
                  <Link to={`/movie-info/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt=""
                      className="rounded-2xl"
                    />
                  </Link>
                </div>
                <div className="flex gap-4 justify-between py-1">
                  <div className="text-xl hover:text-blue-300">
                    <Link to={`/movie-info/${movie.id}`}>{movie.title}</Link>
                  </div>
                  <div className="text-lg">{movie.release_date.split('-')[0]} </div>
                </div>
              </div>
            </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    );
}

export default CategoryCarousal
