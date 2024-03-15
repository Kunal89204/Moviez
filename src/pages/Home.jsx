import React from "react";
import Hero from "../components/Hero";
import CategoryCarousal from "../components/props/CategoryCarousal";
import TvSeries from "../components/TvSeries";

const Home = () => {
  const movieIds = [19995, 14564, 138843, 55779];
  const tvIds = [1396, 95479, 17404, 76479, 104877, 71712, 127532, 105009];
  return (
    <div>
      <Hero movieIds={movieIds} />
      <CategoryCarousal category="top_rated" categoryType="Top Rated" />
      <CategoryCarousal category="now_playing" categoryType="Now  Playing" />
      <TvSeries tvIds={tvIds} />
    </div>
  );
};

export default Home;
