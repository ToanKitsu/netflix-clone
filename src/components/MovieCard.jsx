import { useEffect, useState } from "react";
import axios from "axios";

import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillPlayCircle,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import { CiPlay1 } from "react-icons/ci";
import { FiPlay } from "react-icons/fi";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import requests from "../Requests";

// eslint-disable-next-line react/prop-types
const MovieCard = ({ backdrop_path, title, id, genre_ids }) => {
  // eslint-disable-next-line no-unused-vars
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);

  const { user } = UserAuth();
  const baseImgUrl = "https://image.tmdb.org/t/p";

  const movieID = doc(db, "users", `${user?.email}`);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

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

  return (
    <>
      <div className="hover:scale-125 duration-500 hover:z-20 w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
        {/* <img
          src={`${baseImgUrl}/w500/${backdrop_path}`}
          alt={title}
          className="relative"
        /> */}

        {/* <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
          <p className=" white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full w-full ">
            {title}
          </p>
          <p onClick={saveShow} className="absolute top-0 left-0 text-gray-300">
            {like ? <AiFillHeart /> : <AiOutlineHeart />}
          </p>
        </div> */}
        <div className="relative">
          <img
            src={`${baseImgUrl}/w500/${backdrop_path}`}
            alt={title}
            className=""
          />
          <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
            <p className=" white-space-normal text-4xl md:text-sm font-bold flex justify-center h-full w-full mt-4">
              {truncateString(title, 30)}
            </p>
            <div className="absolute top-0 left-0 flex gap-2 mt-[84px] ms-3">
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
              <p className="text-black p-2 rounded-full bg-white">
                <FiPlay />
              </p>
              <p className="text-black p-2 rounded-full bg-white">
                <AiOutlineLike />
              </p>
              <p className="text-black p-2 rounded-full bg-white">
                <AiOutlineDislike />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MovieCard;
