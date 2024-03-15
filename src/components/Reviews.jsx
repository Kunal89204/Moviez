import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";

const Reviews = (props) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${props.movieid}/reviews`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          language: "en-US",
          page: 1, // Optionally, specify the page number if you want to paginate the results
        },
      })
      .then((response) => {
        // Handle the response containing reviews
        setReviews(response.data.results);
        console.log(reviews);
      })
      .catch(
        (error) => {
          // Handle error
          console.error("Error fetching movie reviews:", error);
        },
        [props.movieid]
      );
  }, [props.movieid]);
  return (
    <div className="pr-3">
      <div className="text-4xl py-4">Reviews</div>

      {reviews &&
        reviews.map((review) => {
          return (
            <div className="p-2 my-2 bg-gray-800 rounded-3xl border-2 border-gray-700 w-fit">
              <div className="flex">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-gray-400">
                  <img
                    src={`https://image.tmdb.org/t/p/original/xUObnJSvHrFPsIpoDmb1jiQZLq7.jpg/${review.author_details.avatar_path}`}
                    alt="null"
                  />
                </div>
                <div className="px-4">
                  <div className="text-lg py-1">{review.author_details.username}</div>
                  <div className="flex gap-2 text-sm">
                    <div className="flex gap-1 items-center bg-gray-700 rounded-full px-2">
                      <CiStar />
                      <div>{review.author_details.rating}</div>
                    </div>
                    <div>{review.created_at.split('T')[0]}</div>
                  </div>
                </div>
              </div>

              <div className="py-2 pl-16 text-gray-400 max-h-56 overflow-auto  custom-scrollbar">
               {review.content}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Reviews;
