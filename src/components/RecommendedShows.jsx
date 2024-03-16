import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const Recommended = (props) => {
  const [recommendedShows, setRecommendedShows] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${props.tvid}/recommendations?language=en-US&page=1`,
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            language: "en-US",
          },
        }
      )
      .then((response) => {
        setRecommendedShows(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, [props.tvid]);

  return (
    <div className="py-4">
      <div className="text-4xl py-4">Recommended</div>
      <div>
        <Swiper spaceBetween={10} slidesPerView={3}>
          {recommendedShows &&
            recommendedShows.map((movies) => {
              return (
                <SwiperSlide>
                  <div>
                    <div className="rounded-xl overflow-hidden">
                      <Link to={`/tv-show/${movies.id}`}>
                        <img
                          src={`https://media.themoviedb.org/t/p/original/${movies.backdrop_path}`}
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="lg:text-2xl truncate">
                      <Link to={`/tv-show/${movies.id}`}>
                        {movies.name}
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
