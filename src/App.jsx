import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from './components/Footer'
import MoviePage from "./pages/MoviePage";
import Popular from "./pages/Popular";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import TvShow from "./pages/TvShow";
import MoviePlayer from "./pages/MoviePlayer";
import TvPlayer from "./pages/TvPlayer";
import SearchResults from "./pages/SearchResults";

const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <ScrollToTopOnRouteChange />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie-info/:movieid" element={<MoviePage />} />
        <Route path="/movie/:movieid" element={<MoviePlayer />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv-shows" element={<TvShows />} />
        <Route path="/tv-show/:showid" element={<TvShow />} />
        <Route path="/tv/:showid" element={<TvPlayer />} />
        <Route path="/search/:moviename" element={<SearchResults />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
