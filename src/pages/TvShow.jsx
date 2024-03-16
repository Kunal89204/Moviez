import React from "react";
import TvShowBanner from "../components/TvShowBanner";
import { useParams } from "react-router-dom";
import ShowCast from "../components/ShowCast";
import RecommendedShows from "../components/RecommendedShows";
import ShowGallery from "../components/ShowGallery";
import ShowReviews from "../components/ShowReviews";



ShowCast
const TvShow = () => {
  const {showid } = useParams();
  return (
    <div>
      <TvShowBanner tvid={showid} />
      <ShowCast tvid={showid} />
      <ShowGallery tvid={showid} />
      <RecommendedShows tvid={showid}/>
      <ShowReviews tvid={showid} />
    </div>
  );
};

export default TvShow;
