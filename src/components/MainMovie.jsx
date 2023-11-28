import { useEffect, useState } from "react";
import requests from "../Requests";
import axios from "axios";
import { useTask } from "../context/context";
import Trailer from "./Trailer";

const MainMovie = () => {
  const [movies, setMovies] = useState([]);
  const [modalTrailer, setModalTrailer] = useState(false);

  const movie = movies[Math.floor(Math.random() * movies.length)];
  const { truncateString, baseImgUrl } = useTask();

  const handleModalTrailer = () => {
    setModalTrailer(!modalTrailer);
  };

  console.log(movie);

  useEffect(() => {
    axios.get(requests.requestPopular).then((resp) => {
      setMovies(resp.data.results);
    });
  }, []);

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className=" absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-[550px] object-cover"
          src={`${baseImgUrl}/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="my-4">
            <button
              className="border bg-gray-300 text-black border-gray-300 py-2 px-5 hover:bg-white"
              onClick={handleModalTrailer}
            >
              Play
            </button>
            <button className="border  text-white border-gray-300 py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Released: {movie?.release_date}
          </p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray">
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>
      {modalTrailer && (
        <div
          className=" fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-40"
          onClick={handleModalTrailer}
        >
          <Trailer movieId={movie?.id} />
        </div>
      )}
    </div>
  );
};
export default MainMovie;
