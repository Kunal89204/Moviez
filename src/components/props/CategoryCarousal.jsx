import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import axios from "axios";
import Loader from "../Loader";

const CategoryCarousal = (props) => {
    const [popularMovie, setPopularMovie] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${props.category}?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en-US&page=1`
        )
        .then((response) => {
          setPopularMovie(response.data.results);
          setLoading(false); // Set loading to false once data is fetched
        })
        .catch((error) => {
          console.log(error);
          setLoading(false); // Set loading to false in case of error too
        });
    }, [props.category]); // Added props.category as dependency to re-fetch data when category changes
  
    return (
      <div className="p-2 2xl:py-10">
        <div className="text-3xl py-4 2xl:text-5xl">
          <Link to={"/popular"}>{props.categoryType}</Link>
        </div>
  
        <div>
          {loading ? ( // Check loading state
            <Loader /> // Display loader if loading is true
          ) : (
            <Swiper
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
              }}
              spaceBetween={50}
              slidesPerView={2}
              navigation={true}
              modules={[Navigation]}
              className="py-10"
            >
              {popularMovie && popularMovie.map((movie) => {
                return (
                    <SwiperSlide className="hover:scale-105">
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
                          <div className="lg:text-xl hover:text-blue-300 truncate">
                            <Link to={`/movie-info/${movie.id}`}>{movie.title}</Link>
                          </div>
                          <div className="text-lg">{movie.release_date.split('-')[0]} </div>
                        </div>
                      </div>
                    </SwiperSlide>
                )
              })}
            </Swiper>
          )}
        </div>
      </div>
    );
}

export default CategoryCarousal;
