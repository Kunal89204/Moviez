import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ShowGallery = (props) => {
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState(null);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/tv/${props.tvid}/images`, {
            params: {
                api_key: import.meta.env.VITE_API_KEY,
            }
        })
        .then((response) => {
            setImages(response.data.backdrops);
        })
        .catch((error) => {
            console.log('Error fetching TV show images:', error);
        });
    }, [props.tvid]);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/tv/${props.tvid}/videos`, {
            params: {
                api_key: import.meta.env.VITE_API_KEY,
            }
        })
        .then((response) => { 
            const results = response.data.results;
            const video = results.find((item) => item.type === "Trailer" && item.site === "YouTube");
            setVideos(video ? video : null);
        })
        .catch((error) => {
            console.log('Error fetching TV show videos:', error);
        });
    }, [props.tvid]);

    return (
        <div className='py-4'>
            <div className='text-4xl p-2 py-4'>Gallery</div>

            <Swiper
                spaceBetween={10}
                slidesPerView={2}
                breakpoints={
                  {
                    300: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    650: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    1040: {
                      slidesPerView: 3,
                      spaceBetween: 10,
                    },
                  }
                }
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {/* Video Slide */}
                <SwiperSlide className='h-full'>
                    <div className='h-full rounded-3xl overflow-hidden'>
                        {videos ? (
                            <iframe
                                className='w-full rounded-3xl'
                                height="235px"
                                src={`https://www.youtube.com/embed/${videos.key}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div>No video available</div>
                        )}
                    </div>
                </SwiperSlide>

                {/* Image Slides */}
                {images.map((image) => (
                    <SwiperSlide key={image.file_path} className='h-full'>
                        <div className='rounded-3xl overflow-hidden'>
                            <img
                                src={`https://media.themoviedb.org/t/p/original/${image.file_path}`}
                                alt="TV show backdrop"
                                className='w-full h-full'
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ShowGallery;
