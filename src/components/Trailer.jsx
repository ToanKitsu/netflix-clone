import { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Trailer = ({ movieId }) => {
  const [videoKey, setVideoKey] = useState(null);
  const apiKey = import.meta.env.VITE_APP_TMDB_AUTH_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
      )
      .then((response) => {
        const firstVideo = response.data.results[0];
        if (firstVideo) {
          setVideoKey(firstVideo.key);
        }
      })
      .catch((error) => {
        console.error("Error fetching movie trailer:", error);
      });
  }, [movieId, apiKey]);

  if (!videoKey) {
    return (
      <p className="w-full h-full bg-black/70 flex justify-center items-center text-9xl text-white ">
        Loading trailer...
      </p>
    );
  }

  return (
    <div>
      <iframe
        className="w-[360px] h-[200px] sm:w-[554px] sm:h-[314px] md:w-[700px] md:h-[392px] lg:w-[900px] lg:h-[504px]"
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoKey}`}
        title="Movie Trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};
export default Trailer;
