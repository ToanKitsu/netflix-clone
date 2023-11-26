/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import Trailer from "./Trailer";
import { FiPlay } from "react-icons/fi";
import { arrayUnion, updateDoc } from "firebase/firestore";

import { UserAuth } from "../context/AuthContext";
import { useTask } from "../context/context";
const MovieCard = ({ backdrop_path, title, id, genre_ids, genres }) => {
  const [vote, setVote] = useState(false);
  const [disLike, setDisLike] = useState(false);
  const [modalTrailer, setModalTrailer] = useState(false);
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const navigate = useNavigate();

  const { truncateString, baseImgUrl, movieID } = useTask();

  const handleVote = () => {
    setVote(!vote);
  };

  const handleDisLike = () => {
    setDisLike(!disLike);
  };

  const handleMoreInfo = () => {
    navigate(`/movies/${id}`);
  };

  const handleIconClick = (e) => {
    e.stopPropagation();
  };

  const handleModalTrailer = () => {
    setModalTrailer(!modalTrailer);
  };

  const filteredGenreNames = genres
    .reduce((acc, genre) => {
      if (genre_ids.includes(genre?.id)) {
        acc.push(genre.name);
      }
      return acc;
    }, [])
    .slice(0, 3)
    .join(" • ");

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id,
          title,
          img: backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };
  // sm:h-[160px] md:h-[180px] lg:h-[200px]
  return (
    <>
      <div
        className="hover:scale-125 duration-500 hover:z-20 w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
        onClick={handleMoreInfo}
      >
        <div className="relative">
          <img
            src={`${baseImgUrl}/w500/${backdrop_path}`}
            alt={title}
            className=""
          />
          <div className=" absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
            <p className=" white-space-normal text-4xl md:text-sm max-sm:text-xs font-bold justify-center h-full w-full mt-4  hidden md:flex ">
              {truncateString(title, 25)}
            </p>
            <p className=" white-space-normal text-4xl md:text-sm max-sm:text-xs font-bold justify-center h-full w-full mt-4 max-md:flex hidden max-md:text-xl">
              {truncateString(title, 13)}
            </p>
            <div
              className="absolute top-0 left-0 flex gap-2 mt-[76px] max-md:mt-[62px] max-sm:mt-[46px] max-sm ms-3 max-sm:text-[8px]"
              onClick={handleIconClick}
            >
              <p
                onClick={saveShow}
                className="text-[#DC2626] p-2 bg-white rounded-full"
              >
                {like ? (
                  <AiFillHeart />
                ) : (
                  <AiOutlineHeart className="text-black" />
                )}
              </p>
              <p
                className="text-black p-2 rounded-full bg-white hover:cursor-pointer"
                onClick={handleModalTrailer}
              >
                <FiPlay />
              </p>
              <p
                className="text-black p-2 rounded-full bg-white"
                onClick={handleVote}
              >
                {vote ? <AiFillLike /> : <AiOutlineLike />}
              </p>
              <p
                className="text-black p-2 rounded-full bg-white"
                onClick={handleDisLike}
              >
                {disLike ? <AiFillDislike /> : <AiOutlineDislike />}
              </p>
            </div>
            <div className="absolute top-0 left-0 flex gap-2 mt-[120px] max-md:mt-[100px] ms-3 text-sm max-lg:hidden">
              {genres && filteredGenreNames}
            </div>
          </div>
        </div>
      </div>

      {modalTrailer && (
        <div
          className=" fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-50"
          onClick={handleModalTrailer}
        >
          <Trailer movieId={id} />
        </div>
      )}
    </>
  );
};
export default MovieCard;
