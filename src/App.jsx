import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from './components/Footer'
import MoviePage from "./pages/MoviePage";
import Popular from "./pages/Popular";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import TvShow from "./pages/TvShow";





const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie-info/:movieid" element={<MoviePage />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv-shows" element={<TvShows />} />
        <Route path="/tv-show/:showid" element={<TvShow />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
