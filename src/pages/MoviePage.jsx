import React from "react";
import { useParams } from "react-router-dom";

import MovieBanner from "../components/MovieBanner";
import Cast from "../components/Cast";
import Recommended from "../components/Recommended";
import Reviews from "../components/Reviews";
import Gallery from "../components/Gallery";


const MoviePage = () => {
  const { movieid } = useParams();
  return (
    <div>
      <MovieBanner movieid={movieid} />
      <Cast movieid={movieid} />
      <Gallery movieid={movieid} />
      <Recommended movieid={movieid} />
      <Reviews movieid={movieid} />
    </div>
  );
};

export default MoviePage;
