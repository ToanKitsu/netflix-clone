import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

// eslint-disable-next-line react/prop-types
const Row = ({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios.get(fetchURL).then((resp) => {
      setMovies(resp.data.results);
    });
  }, [fetchURL]);

  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <AiOutlineLeft
          onClick={slideLeft}
          size={40}
          className="absolute left-0 m-2 bg-white rounded-full opacity-50 hover:opacity-100 z-10 cursor-pointer hidden group-hover:block"
        />

        <div
          id={`slider` + rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => {
            return item.backdrop_path && <MovieCard key={id} {...item} />;
          })}
        </div>

        <AiOutlineRight
          onClick={slideRight}
          size={40}
          className="absolute right-0 m-2 bg-white rounded-full opacity-50 hover:opacity-100 z-10 cursor-pointer hidden group-hover:block"
        />
      </div>
    </>
  );
};
export default Row;
