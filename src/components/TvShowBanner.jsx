import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CiStar } from "react-icons/ci";

const TvShowBanner = (props) => {
    const [tvData, setTvData] = useState({});

    useEffect(() => {
        const fetchTvData = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${props.tvid}?api_key=${import.meta.env.VITE_API_KEY}&append_to_response=credits`);
                setTvData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching TV show data:', error);
            }
        };

        fetchTvData();
    }, [props.tvid]);

    return (
        <div className="lg:flex relative lg:h-screen overflow-hidden items-center 2xl:items-start">
            {tvData && tvData.backdrop_path && (
                <img
                    src={`https://image.tmdb.org/t/p/original/${tvData.backdrop_path}`}
                    alt=""
                    className="absolute -z-10 opacity-20 lg:h-screen w-screen"
                />
            )}
            <div className="w-full lg:w-1/3 flex items-center p-16">
                {tvData && tvData.poster_path && (
                    <img
                        src={`https://image.tmdb.org/t/p/original/${tvData.poster_path}`}
                        alt=""
                        className="rounded-2xl shadow-lg shadow-gray-800 2xl:mt-10"
                    />
                )}
            </div>
            <div className="lg:w-2/3 pt-16 p-4 2xl:pl-20">
                <div className="lg:text-5xl text-4xl py-4 2xl:text-9xl 2xl:mt-24 2xl:pb-5">{tvData.name}</div>
                <div className="text-xl text-gray-400 2xl:text-2xl">{tvData.tagline}</div>
                <div className="flex ">
                    <div className="lg:w-3/4  lg:pr-10 ">
                        <div className="flex justify-around lg:justify-start lg:gap-2 py-4 overflow-auto">
                            {tvData &&
                                tvData.genres &&
                                tvData.genres.map((genre) => (
                                    <div
                                        className="bg-gray-800 py-1 px-2 lg:px-6 rounded-2xl text-sm text-gray-400 w-fit 2xl:text-xl"
                                        key={genre.id}
                                    >
                                        {genre.name}
                                    </div>
                                ))}
                        </div>
                        <div className="subtitle flex items-center gap-5 lg:text-lg text-sm  py-4 2xl:text-2xl" data-swiper-parallax="-200">
                            <div className="flex items-center lg:gap-2">
                                <CiStar className="text-xl" /> {tvData.vote_average}
                            </div>
                            <div className="font-semibold">{tvData.first_air_date}</div>
                            <div className="font-semibold">{tvData.episode_run_time && tvData.episode_run_time[0]} min/ep</div>
                            <div className="font-semibold">{tvData.number_of_seasons} Seasons</div>
                            <div className="font-semibold">{tvData.number_of_episodes} Episodes</div>
                        </div>
                        <div className="py-2 2xl:text-xl">{tvData.overview}</div>
                        <div className="flex justify-center lg:justify-start gap-4 py-4 2xl:pt-10">
                            <Link to={`/tv/${tvData.id}`}>
                                <button className="py-4 px-10 rounded-full hover:scale-105 bg-gradient-to-r from-blue-800 to-teal-400 font-semibold">
                                    Watch Now
                                </button>
                            </Link>
                            <button className="py-4 px-10 rounded-full hover:bg-gradient-to-r hover:from-blue-800 hover:to-teal-400 hover:border-transparent border-2 border-teal-300 font-semibold">
                                To Watchlist
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TvShowBanner;
