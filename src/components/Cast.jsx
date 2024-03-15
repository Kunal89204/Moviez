import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";


const Cast = (props) => {
    const [castInfo, setCast] = useState()

    useEffect(() => {
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${props.movieid}?api_key=${
              import.meta.env.VITE_API_KEY
            }&append_to_response=credits`
          )
          .then((response) => {
            setCast(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [props.movieid]);



  return (
    <div className="p-10">

      <div className="text-4xl py-2">Cast</div>
      <Swiper
      spaceBetween={1}
      slidesPerView={9}
     
    >

        {castInfo && castInfo.credits.cast.map((eachcast) => {
            return  (

      <SwiperSlide>
        <div className="flex flex-col items-center w-full">
            <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-blue-600"><img src={`https://image.tmdb.org/t/p/original${eachcast.profile_path}`} alt="" className="w-full" /></div>
            <div className="text-center">{eachcast.name}</div>
        </div>
      </SwiperSlide>
            )
        })}
      
    </Swiper>
    </div>
  )
}

export default Cast
