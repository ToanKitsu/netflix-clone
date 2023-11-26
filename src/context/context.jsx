/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { UserAuth } from "./AuthContext";
import { db } from "../firebase";
import { doc } from "firebase/firestore";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const { user } = UserAuth();
  const baseImgUrl = "https://image.tmdb.org/t/p";
  const apiKey = import.meta.env.VITE_APP_TMDB_AUTH_KEY;
  const movieID = doc(db, "users", `${user?.email}`);

  const movieUrl = (id) => {
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <TaskContext.Provider
      value={{ truncateString, baseImgUrl, movieUrl, movieID }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const useTask = () => {
  return useContext(TaskContext);
};

export { TaskProvider, useTask };
