import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import MoreInfo from "./components/MoreInfo";
import { TaskProvider } from "./context/context";

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <TaskProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route path="/movies/:id" element={<MoreInfo />} />
          </Routes>
        </TaskProvider>
      </AuthContextProvider>
    </>
  );
}
