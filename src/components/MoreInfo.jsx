import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
const MoreInfo = () => {
  const { id } = useParams();
  const [singleMovie, setSingleMovie] = useState([]);
  const baseImgUrl = "https://image.tmdb.org/t/p";
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=f9be5a8ffc38df1c193902c1420deb91`;

  useEffect(() => {
    axios.get(url).then((res) => setSingleMovie(res.data));
  }, []);

  console.log(singleMovie);

  return (
    <>
      <div className=" grid grid-cols-2 gap-4">
        <div className="">
          <p className=" text-4xl text-white mt-14 p-4">
            {singleMovie?.original_title}
          </p>
          <div className="flex text-[#D1D5DB]">
            <p className="ps-4 flex items-center">
              <FaStar className="mr-1" />{" "}
              {singleMovie?.vote_average?.toFixed(1)}
            </p>
            <span className=" m-2">•</span>
            <p className="flex items-center">{singleMovie?.status}</p>
            <span className=" m-2">•</span>
            <p className="flex items-center">{singleMovie?.release_date}</p>
            <span className=" m-2">•</span>
            <p className="flex items-center">{singleMovie?.runtime} Minutes</p>
            <span className=" m-2">•</span>
            <p className="flex items-center">
              {singleMovie?.original_language?.toUpperCase()}
            </p>
          </div>
          <div className="text-[#D1D5DB] ps-4">
            <p>{singleMovie?.overview}</p>
          </div>
          <div>
            <p className="text-[#D1D5DB]">
              Genres: <span className="text-white"></span>
            </p>
          </div>
        </div>
        <div className="relative ">
          <img
            src={`${baseImgUrl}/original/${singleMovie?.backdrop_path}`}
            alt={singleMovie.title}
            className="w-full h-auto "
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent via-55% to-black "></div>
        </div>
      </div>
    </>
  );
};
export default MoreInfo;
