import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiPlay } from "react-icons/fi";
import Row from "./Row";
import requests from "../Requests";
import Trailer from "./Trailer";

const MoreInfo = () => {
  const { id } = useParams();
  const [singleMovie, setSingleMovie] = useState([]);
  const [modalTrailer, setModalTrailer] = useState(false);
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  const movieID = doc(db, "users", `${user?.email}`);

  const baseImgUrl = "https://image.tmdb.org/t/p";
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=f9be5a8ffc38df1c193902c1420deb91`;
  const genresName = singleMovie?.genres?.map((genre) => genre.name).join(", ");

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: singleMovie?.id,
          title: singleMovie?.original_title,
          img: singleMovie?.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };

  const handleModalTrailer = () => {
    setModalTrailer(!modalTrailer);
  };

  const countrys = singleMovie?.production_countries?.map(
    (country) => country.name
  );

  const productionCompanies = singleMovie?.production_companies?.map(
    (company) => company.name
  );

  useEffect(() => {
    axios.get(url).then((res) => setSingleMovie(res.data));
  }, [id]);
  return (
    <>
      {/* Top section */}
      <div className=" grid sm:grid-cols-2 gap-4">
        <div className="col-span-1">
          <p className=" text-4xl text-white mt-14 p-4">
            {singleMovie?.original_title}
          </p>
          <ul className="flex text-gray-400 items-center">
            <li>
              <p className="ps-4 flex items-center">
                <FaStar className="mr-1" />{" "}
                {singleMovie?.vote_average?.toFixed(1)}
              </p>
            </li>
            <li className="flex items-center">
              <span className="ms-5 mr-5">•</span>
              <p>{singleMovie?.status}</p>
            </li>
            <li className="flex items-center max-md:hidden">
              <span className=" ms-5 mr-5">•</span>
              <p>{singleMovie?.release_date}</p>
            </li>
            <li className="flex items-center">
              <span className=" ms-5 mr-5">•</span>
              <p>{singleMovie?.runtime} Minutes</p>
            </li>
            <li className="flex items-center">
              <span className=" ms-5 mr-5">•</span>
              <p>{singleMovie?.original_language?.toUpperCase()}</p>
            </li>
          </ul>
          <div className="text-gray-400 ps-4 mt-2">
            <p>{singleMovie?.overview}</p>
          </div>
          <div>
            <p className="text-gray-400 ms-4 mt-2">
              Genres: <span className="text-white">{genresName}</span>
            </p>
          </div>
          <div>
            <p className="text-gray-400 ms-4 mt-2">
              Tagline:{" "}
              <span className="text-white">{singleMovie?.tagline}</span>
            </p>
          </div>
          <div className=" flex gap-8 ms-4 mt-6 mb-4">
            <div className="flex items-center flex-row">
              <p
                className="  bg-white rounded-full w-10 h-10 flex justify-center items-center hover:cursor-pointer"
                onClick={handleModalTrailer}
              >
                <FiPlay />
              </p>
              <p className="text-white ms-2 font-bold">TRAILER</p>
            </div>
            <div className="flex items-center">
              <p
                onClick={saveShow}
                className="  bg-white rounded-full w-10 h-10 flex justify-center items-center hover:cursor-pointer"
              >
                {like ? (
                  <AiFillHeart className="w-6 h-6 text-[#DC2626]" />
                ) : (
                  <AiOutlineHeart className="text-black w-6 h-6" />
                )}
              </p>
              <p className="text-white ms-2 font-bold">FAVORITE</p>
            </div>
          </div>
        </div>
        <div className="relative max-sm:hidden sm:col-span-1 ">
          <div className="max-lg:block hidden w-full h-full">
            <img
              src={`${baseImgUrl}/original/${singleMovie?.poster_path}`}
              alt={singleMovie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent via-55% to-black "></div>
          </div>
          <div className="lg:block hidden w-full h-full">
            <img
              src={`${baseImgUrl}/original/${singleMovie?.backdrop_path}`}
              alt={singleMovie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent via-55% to-black "></div>
          </div>
        </div>
      </div>

      {/* Second section */}
      <div className="bg-[#0C0C0C] w-full h-auto pb-4">
        <div>
          <ul className="text-white ms-4 pt-4">
            <ul className=" grid grid-cols-3 gap-5 max-lg:grid-cols-2 lg:grid-cols-6">
              {/* Country */}
              <li>
                <span className=" text-gray-400">Country:</span>
                <div className="mt-3 text-white">
                  {countrys?.map((company, index) => {
                    return <p key={`${index}a`}>{company}</p>;
                  })}
                </div>
              </li>

              {/* Companies */}
              <li>
                <span className="text-gray-400">Production Companies:</span>
                <div className="mt-3 text-white">
                  {productionCompanies?.map((company, index) => {
                    return <p key={index}>{company}</p>;
                  })}
                </div>
              </li>

              {singleMovie?.homepage && (
                <li className="lg:col-span-3 max-lg:col-span-2">
                  <span className="text-gray-400">Homepage:</span>
                  <div className="mt-3 text-white">
                    <span>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={singleMovie?.homepage}
                      >
                        {singleMovie?.homepage?.toString()}
                      </a>
                    </span>
                  </div>
                </li>
              )}
            </ul>
          </ul>
        </div>
      </div>

      {/* Also like */}
      <div className="bg-[#0C0C0C] h-full w-full pb-20">
        <Row title="You may also like" fetchURL={requests.requestPopular} />
        <Row title="Trending" fetchURL={requests.requestTrending} />
      </div>

      {modalTrailer && (
        <div
          className=" fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center"
          onClick={handleModalTrailer}
        >
          <Trailer movieId={id} />
        </div>
      )}
    </>
  );
};
export default MoreInfo;
