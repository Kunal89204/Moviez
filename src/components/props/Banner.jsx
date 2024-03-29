import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="p-2">
      <div
        className=" bgsh h-96 rounded-3xl p-4 flex items-center"
        style={{
          backgroundImage: `url("https://webneel.com/wnet/file/images/11-16/8-xmen-movie-poster-design.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-2/3 2xl:w-1/3">
          <div className="text-xl lg:text-4xl py-2 2xl:text-5xl 2xl:py-4">X-Men: Apocalypse (2016)</div>
          <div className="py-2 text-sm lg:text-lg 2xl:text-xl">
            After the re-emergence of the world's first mutant, world-destroyer
            Apocalypse, the X-Men must unite to defeat his extinction level
            plan.
          </div>
          <div className="py-4 2xl:py-6">
            <Link to={`/movie-info/246655`}>
              <button className="py-4 px-10 bg-gradient-to-r from-blue-800 to-teal-400 font-semibold 2xl:text-xl">
                Watch Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
