import axios from "axios";
import { useEffect, useState, useRef } from "react";
import MovieCard from "./MovieCard";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import requests from "../Requests";

// eslint-disable-next-line react/prop-types
const Row = ({ title, fetchURL }) => {
  const slider = useRef();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((resp) => {
      setMovies(resp.data.results);
    });
    axios.get(requests.requestGenre).then((res) => setGenres(res.data.genres));
  }, [fetchURL]);

  const slideLeft = () => {
    slider.current.scrollLeft = slider.current.scrollLeft - 500;
  };
  const slideRight = () => {
    slider.current.scrollLeft = slider.current.scrollLeft + 500;
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl pl-4 pr-4 ">{title}</h2>
      <div className="relative flex items-center group ">
        <AiOutlineLeft
          onClick={slideLeft}
          size={40}
          className="absolute left-0 m-2 bg-white rounded-full opacity-50 hover:opacity-100 z-30 cursor-pointer hidden group-hover:block"
        />

        <div
          ref={slider}
          className="w-full sm:h-[180px] md:h-[200px] lg:h-[240px] overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative overflow-y-hidden pt-4 pb-4"
        >
          {movies.map((item, id) => {
            return (
              item.backdrop_path && (
                <MovieCard key={id} {...item} genres={genres} />
              )
            );
          })}
        </div>

        <AiOutlineRight
          onClick={slideRight}
          size={40}
          className="absolute right-0 m-2 bg-white rounded-full opacity-50 hover:opacity-100 z-30 cursor-pointer hidden group-hover:block"
        />
      </div>
    </>
  );
};
export default Row;
