import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ImgComponent = (props) => {
  return (
    <div className="aspect-square overflow-hidden rounded-xl relative">
      <Link to={`/tv-show/${props.showid}`}>
        <img
          src={`https://media.themoviedb.org/t/p/original${props.imgurl}`}
          alt=""
          className="hover:scale-110"
        />
      </Link>
      <div className="absolute z-20 bottom-2 left-2">
        <div className="font-semibold text-lg">{props.showtitle}</div>
        <div className="text-gray-300">{props.season} Seasons</div>
      </div>
    </div>
  );
};

const TvSeries = ({ tvIds }) => {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    const fetchShowData = async () => {
      try {
        const tvShowData = await Promise.all(
          tvIds.map(async (tvId) => {
            const response = await axios.get(
              `https://api.themoviedb.org/3/tv/${tvId}`,
              {
                params: {
                  api_key: import.meta.env.VITE_API_KEY,
                  language: "en-US",
                },
              }
            );
            return response.data; // Returning the data fetched for each TV show
          })
        );
        setTvShows(tvShowData); // Set the fetched TV show data to state
      } catch (error) {
        console.log(error);
      }
    };

    fetchShowData();
  }, [tvIds]);

  return (
    <div className="p-2">
      <div className="text-3xl">
        <Link to={"/tv-shows"}>TV Shows</Link>
      </div>

      <div className="flex ">
        <div className="w-1/3  p-2">
          <div className="aspect-square overflow-hidden rounded-xl relative">
          <Link to={'/tv-show/71728'}>
          <img
              src="https://media.themoviedb.org/t/p/original/tKwjkqTSq5fJdSxIk4yOh61tOKD.jpg"
              alt=""
              className="hover:scale-110"
            />
          </Link>
            <div className="absolute z-20 bottom-2 left-2">
              <div className="font-semibold text-lg">Young Sheldon</div>
              <div className="text-gray-300">7 Seasons</div>
            </div>
          </div>
        </div>

        <div className="w-2/3 flex flex-wrap">
          {tvShows &&
            tvShows.map((tvshow) => {
              return (
                <div className=" w-1/4 p-2">
                  <ImgComponent
                    key={tvshow.id}
                    showid={tvshow.id}
                    imgurl={tvshow.poster_path}
                    showtitle={tvshow.name}
                    season={tvshow.number_of_seasons}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TvSeries;
