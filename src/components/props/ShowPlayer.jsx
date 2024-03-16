import axios from "axios";
import React, { useEffect, useState } from "react";
import Recommended from "../RecommendedShows";
import { CiStar } from "react-icons/ci";

const ShowPlayer = (props) => {
  const [showData, setShowData] = useState({});
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(
        `https://api.themoviedb.org/3/tv/${props.id}?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then((response) => {
        setShowData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching show data");
        setLoading(false);
      });
  }, [props.id]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(
        `https://api.themoviedb.org/3/tv/${props.id}/videos?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then((response) => {
        const trailerData = response.data;
        const trailer = trailerData.results.find(
          (result) => result.type === "Trailer" && result.site === "YouTube"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setError("No trailer found for this show");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching trailer data");
        setLoading(false);
      });
  }, [props.id]);

  const videoUrl = trailerKey ? `https://www.youtube.com/embed/${trailerKey}` : null;

  if (loading) {
    return <div>Loading...</div>;
  }

 

  return (
    <div className="pt-16">
    {trailerKey ? (
      <div className="rounded-xl overflow-hidden p-4 lg:p-10">
        <iframe
          className="lg:h-[80vh] h-[25vh] w-full rounded-2xl"
          src={videoUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    ) : (
      <div className="text-4xl">No trailer available</div>
    )}

      <div>
        <div className="flex p-4">
          <div className="w-1/3  p-2 h-min">
            <img
              src={`https://image.tmdb.org/t/p/original/${showData.poster_path}`}
              alt={showData.name}
              className="rounded-xl"
            />
          </div>
          <div className="w-2/3 px-4">
            <div className="lg:text-6xl text-2xl py-4">{showData.name}</div>
            <div className="lg:text-lg text-gray-400">{showData.tagline}</div>
            <div className="flex gap-2 pt-1 lg:pt-4 lg:pb-2">
              {showData.genres.map((genre) => (
                <div
                  key={genre.id}
                  className="bg-gray-800 py-1 px-2 rounded-2xl text-sm text-gray-400"
                >
                  {genre.name}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 lg:mt-4 mt-1 text-sm flex-wrap lg:flex-nowrap">
              <span className="text-xl">
                <CiStar />
              </span>
              <span>{showData.vote_average}</span>
              <span>{showData.first_air_date}</span>
              <span>{showData.episode_run_time[0]} min/ep</span>
              <span>{showData.number_of_seasons} Seasons</span>
            </div>
            <div className="py-4 lg:text-lg hidden lg:block">
              {showData.overview}
            </div>

            <div>
            
              <div className="hidden lg:block">
                <Recommended movieid={props.id} />
              </div>
            </div>
          </div>
        </div>

        <div className="py-4 lg:text-lg lg:hidden block px-4">
              {showData.overview}
            </div>
            <div className="lg:hidden block">
                <Recommended movieid={props.id} />
              </div>
      </div>
    </div>
  );

};

export default ShowPlayer;
