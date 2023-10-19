import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

// eslint-disable-next-line react/prop-types
const MovieCard = ({ backdrop_path, title, id }) => {
  // eslint-disable-next-line no-unused-vars
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, "users", `${user?.email}`);

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

  const baseImgUrl = "https://image.tmdb.org/t/p";
  return (
    <>
      <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
        <img src={`${baseImgUrl}/w500/${backdrop_path}`} alt={title} />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
          <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full w-full">
            {title}
          </p>
          <p onClick={saveShow} className="absolute top-4 left-4 text-gray-300">
            {like ? <AiFillHeart /> : <AiOutlineHeart />}
          </p>
        </div>
      </div>
    </>
  );
};
export default MovieCard;
