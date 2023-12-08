import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { useTask } from "../context/context";
import { useNavigate } from "react-router-dom";

const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  const { truncateString } = useTask();
  const navigate = useNavigate();

  const handleIconClick = (e) => {
    e.stopPropagation();
  };

  const handleMoreInfo = (id) => {
    navigate(`/movies/${id}`);
  };

  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const movieList = doc(db, "users", `${user?.email}`);
  const deleteShow = async (movieId) => {
    try {
      const result = movies.filter((movie) => movie.id !== movieId);
      await updateDoc(movieList, {
        savedShows: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  return (
    <>
      <h2 className="text-white font-bold md:text-xl pt-4 ps-4 pr-4">
        My Shows
      </h2>
      <div className="relative flex items-center group">
        <AiOutlineLeft
          onClick={slideLeft}
          size={40}
          className="absolute left-0 m-2 bg-white rounded-full opacity-50 hover:opacity-100 z-30 cursor-pointer hidden group-hover:block"
        />

        <div
          id={`slider`}
          className="w-full sm:h-[180px] md:h-[200px] lg:h-[240px] overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative overflow-y-hidden pt-4 max-md:pt-6 max-md:pb-6 "
        >
          {movies.map((item, id) => {
            return (
              <div
                key={id}
                className="hover:scale-125 duration-500 hover:z-20 w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
                onClick={() => handleMoreInfo(item?.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                  alt={item?.title}
                />
                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white hover:scale-[95%]">
                  <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full w-full">
                    {truncateString(item.title, 30)}
                  </p>
                  <div onClick={handleIconClick}>
                    <p
                      onClick={() => deleteShow(item?.id)}
                      className="absolute top-0 right-0 p-3 text-gray-300"
                    >
                      <AiOutlineClose />
                    </p>
                  </div>
                </div>
              </div>
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
export default SavedShows;
