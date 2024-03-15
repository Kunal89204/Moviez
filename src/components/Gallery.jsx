import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Gallery = (props) => {
    const [images, setImages] = useState({});
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${props.movieid}/images`, {
            params: {
                api_key: import.meta.env.VITE_API_KEY,
            }
        })
        .then((response) => {
            setImages(response.data);
        
        })
        .catch((error) => {
            console.log('Error fetching movie images:', error);
        });
    }, [props.movieid]);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${props.movieid}/videos`, {
            params: {
                api_key: import.meta.env.VITE_API_KEY,
            }
        })
      .then((response) => { 
         setVideos(response.data.results[0]);
         console.log(response.data);
      })
    }, [props.movieid])

    return (
        <div className='py-4'>
          <div className='text-4xl p-2 py-4'>Gallery</div>
      
          <Swiper
            spaceBetween={10}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {/* Video Slide */}
            <SwiperSlide className='h-full'>
              <div className=' h-full rounded-3xl overflow-hidden'>
                <iframe
                  className='w-full rounded-3xl'
                  height="235px"
                  src={`https://www.youtube.com/embed/${videos.key}`}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </SwiperSlide>
      
            {/* Image Slides */}
            {images &&
              images.backdrops &&
              images.backdrops.slice(0, 10).map((image) => (
                <SwiperSlide key={image.file_path} className='h-full'>
                  <div className='rounded-3xl overflow-hidden'>
                    <img
                      src={`https://media.themoviedb.org/t/p/original/${image.file_path}`}
                      alt="Movie backdrop"
                      className='w-full h-full'
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      );
      
};

export default Gallery;
