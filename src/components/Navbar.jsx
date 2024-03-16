import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { CiUser } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";


const Navbar = () => {
  const [input, setInput] = useState("")
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
    <div className="absolute z-10 w-full backdrop-blur-sm lg:block hidden">
      <div className="flex items-center justify-between">
        <div>
          <Link>
            <img src={logo} alt="logo" className="h-16" />
          </Link>
        </div>

        <nav className="flex items-center text-xl gap-10 ">
          <div className=" bg-clip-text text-transparent bg-gradient-to-tr from-blue-700 to-teal-400 font-semibold">
            <Link to={'/'}>Home</Link>
          </div>
          <div className=" bg-clip-text text-transparent bg-gradient-to-tr from-blue-700 to-teal-400 font-semibold">
            <Link to={'/movies'}>Movies</Link>
          </div>
          <div className=" bg-clip-text text-transparent bg-gradient-to-tr from-blue-700 to-teal-400 font-semibold">
            <Link to={'tv-shows'}>TV Shows</Link>
          </div>
          <div className=" bg-clip-text text-transparent bg-gradient-to-tr from-blue-700 to-teal-400 font-semibold">
            <Link to={'/popular'}>Top</Link>
          </div>
        </nav>
        <div className="flex text-2xl px-10 gap-5 items-center">
          <CiUser /> <div className="relative">
            <input type="text" placeholder="Search for a movie" value={input} onChange={(e) => setInput(e.target.value)} className="placeholder:text-sm placeholder:text-white py-1 px-2 rounded-lg bg-gray-800 outline-none flex items-center" />
          <Link to={`/search/${input}`}><CiSearch className="absolute top-2 right-2" /></Link>
          </div>
        </div>
      </div>
    
    </div>



    

<nav class="bg-white border-gray-200 dark:bg-gray-900 block lg:hidden ">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logo} class="h-8" alt="Flowbite Logo" />
    </Link>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false"   onClick={toggleNavbar}>
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className={`w-full md:w-auto ${isOpen ? '' : 'hidden'}`} id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <div className="flex text-2xl px-1 gap-5 items-center mb-2">
         <div className="relative w-full">
            <input type="text" placeholder="Search for a movie" value={input} onChange={(e) => setInput(e.target.value)} className="placeholder:text-sm placeholder:text-white py-1 px-2 rounded-lg bg-gray-800 outline-none border w-full text-lg" />
          <Link to={`/search/${input}`}><CiSearch className="absolute top-2 right-2" /></Link>
          </div>
        </div>
        </li>
        <li>
          <Link to={`/`} class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</Link>
        </li>
        <li>
          <Link to={`/movies`} class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Movies</Link>
        </li>
        <li>
          <Link to={`/tv-shows`} class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">TV Shows</Link>
        </li>
        <li>
          <Link to={`/popular`} class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Top</Link>
        </li>
        
      </ul>
    </div>
  </div>
</nav>


    </>
  );
};

export default Navbar;
