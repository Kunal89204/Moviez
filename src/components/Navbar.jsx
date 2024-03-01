import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { CiUser } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className="absolute z-10 w-full backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <Link>
            <img src={logo} alt="logo" className="h-16" />
          </Link>
        </div>

        <nav className="flex items-center text-xl gap-10 ">
          <div className=" bg-clip-text text-transparent bg-gradient-to-tr from-blue-700 to bg-teal-400 font-semibold">
            <Link>Home</Link>
          </div>
          <div className=" bg-clip-text text-transparent bg-gradient-to-tr from-blue-700 to bg-teal-400 font-semibold">
            <Link>Movies</Link>
          </div>
          <div className=" bg-clip-text text-transparent bg-gradient-to-tr from-blue-700 to bg-teal-400 font-semibold">
            <Link>TV Shows</Link>
          </div>
          <div className=" bg-clip-text text-transparent bg-gradient-to-tr from-blue-700 to bg-teal-400 font-semibold">
            <Link>Top</Link>
          </div>
        </nav>
        <div className="flex text-2xl px-10 gap-5 ">
          <CiUser /> <CiSearch />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
